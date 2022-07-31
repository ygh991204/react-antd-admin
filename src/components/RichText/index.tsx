import React, { useRef, useEffect, useCallback, useState, ChangeEvent } from 'react'
import { v1 as uuidv1 } from 'uuid'
import styled from 'styled-components'
import Quill, { SelectionChange, textAlignParam, fontSizeParams, colorParams, fontWeightParams } from './quill'
import { fileFormatValidateImage, FileType, fileSizeValidateImage } from '@/utils/file'
import { uploadImage } from '@/api/static'

import './style.less'
import './package.less'

export interface RichTextProps {
  value?: string
  disabled?: boolean
  placeholder?: string
  onChange?: (html: string, text: string, quill: Quill) => void
  onFocus?: (quill: Quill) => void
  onBlur?: (quill: Quill) => void
  height?: number
}

const RichTextMain = styled.div<{
  height?: number
}>`
  width: 100%;
  height: ${(props) => props.height || 500}px !important;
`

const RichText = React.memo<RichTextProps>(
  ({ placeholder = '请输入', value = '', disabled = false, height = 500, onChange, onBlur, onFocus }) => {
    const quillEl = useRef<HTMLDivElement>(null)
    const myQuill = useRef<Quill>()
    const [toolBarId] = useState('RichTextToolBar' + uuidv1())
    const content = useRef('')

    const imageUploadEl = useRef<HTMLInputElement>(null)

    const selectionChange: SelectionChange = useCallback((range) => {
      if (range) {
        onFocus && myQuill.current && onFocus(myQuill.current)
      } else {
        onBlur && myQuill.current && onBlur(myQuill.current)
      }
    }, [])

    const textChange = useCallback(() => {
      const { html, text } = getContent()
      if (onChange && myQuill.current) {
        onChange(html, text, myQuill.current)
      }
    }, [])

    const getContent = useCallback(() => {
      let text = ''
      let html = ''
      if (myQuill.current) {
        const _text = myQuill.current.getText()
        const flag = _text.replace(/&nbsp;/g, '').replace(/\s/g, '')
        if (flag) {
          text = myQuill.current.getText()
          html = myQuill.current.root.innerHTML
        }
      }
      content.current = html
      return { html, text }
    }, [])

    const setContent = useCallback((html: string) => {
      myQuill.current?.clipboard.dangerouslyPasteHTML(html)
    }, [])

    const customImageHandler = useCallback(() => {
      imageUploadEl.current?.click()
    }, [])

    const imageUploadChange = useCallback(async(event: ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files ? [...event.target.files] : []
      const range = myQuill.current?.getSelection(true)
      if (files.length && range && fileFormatValidateImage(files, true) && fileSizeValidateImage(files, true)) {
        const reslut = await Promise.all(files.map((file) => uploadImage(file)))
        let rangeIndex = range.index
        reslut.forEach((item) => {
          myQuill.current?.insertEmbed(rangeIndex, 'RichTextPTag', `<br/>`)
          rangeIndex++
          myQuill.current?.insertEmbed(rangeIndex, 'image', item.fileUrl)
          rangeIndex++
          myQuill.current?.insertEmbed(rangeIndex, 'RichTextPTag', `<br/>`)
          rangeIndex++
        })
        myQuill.current?.setSelection(rangeIndex as any)
      }
    }, [])

    useEffect(() => {
      if (quillEl.current) {
        myQuill.current = new Quill(quillEl.current, {
          theme: 'snow',
          placeholder: placeholder,
          readOnly: false,
          modules: {
            toolbar: {
              container: '#' + toolBarId,
              handlers: {
                image: customImageHandler
              }
            }
          }
        })
        myQuill.current.on('selection-change', selectionChange)
        myQuill.current.on('text-change', textChange)
      }
    }, [])

    useEffect(() => {
      if (value && value !== content.current) {
        content.current = value
        setContent(value)
      } else if (!value) {
        content.current = ''
        myQuill.current?.setText('')
      }
    }, [value])

    useEffect(() => {
      myQuill.current?.enable(!disabled)
    }, [disabled])

    return (
      <div>
        <input
          style={{ display: 'none' }}
          ref={imageUploadEl}
          multiple
          type='file'
          accept={FileType['image']}
          onChange={imageUploadChange}
        />
        <div id={toolBarId}>
          <select className='ql-size' title='字体大小' defaultValue='df'>
            {fontSizeParams.map((v) => (
              <option key={v} value={v} />
            ))}
          </select>
          <select className='ql-weight' title='字体粗细' defaultValue='regular'>
            {fontWeightParams.map((v) => (
              <option key={v} value={v} />
            ))}
          </select>
          {/*  */}
          <button className='ql-bold' title='加粗' />
          <button className='ql-italic' title='斜体' />
          <button className='ql-underline' title='下划线' />
          <button className='ql-strike' title='删除线' />
          {/*  */}
          <select className='ql-color' defaultValue='' title='字体颜色'>
            {colorParams.map((v) => (
              <option key={v} value={v} />
            ))}
          </select>
          <select className='ql-background' defaultValue='' title='背景颜色'>
            {colorParams.map((v) => (
              <option key={v} value={v} label={'#333333'} />
            ))}
          </select>
          {/*  */}
          <button className='ql-script' value='super' title='脚本-上' />
          <button className='ql-script' value='sub' title='脚本-下' />
          {/*  */}
          <button className='ql-header' value='1' title='大标题' />
          <button className='ql-header' value='2' title='中标题' />
          {/*  */}
          <button className='ql-indent' value='-1' title='缩进-1' />
          <button className='ql-indent' value='+1' title='缩进+1' />
          {/*  */}
          <button className='ql-direction' value='rtl' title='文本方向' />
          <select className='ql-align' title='对齐方式' defaultValue=''>
            <option value='' />
            {textAlignParam.map((v) => (
              <option key={v} value={v} />
            ))}
          </select>
          {/*  */}
          <button className='ql-link' title='插入链接' />
          <button className='ql-image' value='image' title='插入图片' />
          {/*  */}
          <button className='ql-clean' title='清楚格式' />
        </div>
        <RichTextMain height={height} className='richtext-content' ref={quillEl} />
      </div>
    )
  }
)

export default RichText
