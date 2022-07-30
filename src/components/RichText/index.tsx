import React, { useRef, useEffect, useCallback, useState } from 'react'

import Quill, { SelectionChangeHandler } from 'quill'

import { v1 as uuidv1 } from 'uuid'

import styled from 'styled-components'

import 'quill/dist/quill.snow.css'
import './style-package.less'

const textAlignParam = ['right', 'center']
const fontSizeParams = ['xs', 'sm', 'df', 'lg', 'xl', 'xxl', 'xxxl', 'xsl', 'sl', 'ssl', 'sssl']
const fontWeightParams = ['regular', 'medium', 'semibold']

const DirectionClass = Quill.import('attributors/class/direction')
DirectionClass.keyName = 'ql-direction'
Quill.register(DirectionClass, true)

const AlignClass = Quill.import('attributors/class/align')
AlignClass.whitelist = textAlignParam
AlignClass.keyName = 'ql-text-align'
Quill.register(AlignClass, true)

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

    const selectionChange: SelectionChangeHandler = useCallback((range) => {
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
          text = _text
          html = myQuill.current.root.innerHTML
        }
      }
      content.current = html
      return { html, text }
    }, [])

    const setContent = useCallback((html: string) => {
      myQuill.current?.clipboard.dangerouslyPasteHTML(html)
    }, [])

    useEffect(() => {
      if (quillEl.current) {
        myQuill.current = new Quill(quillEl.current, {
          theme: 'snow',
          placeholder: placeholder,
          readOnly: false,
          modules: {
            toolbar: {
              container: '#' + toolBarId
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
        <div id={toolBarId}>
          <button className='ql-bold' title='加粗' />
          <button className='ql-italic' title='斜体' />
          <button className='ql-underline' title='下划线' />
          <button className='ql-strike' title='删除线' />
          <button className='ql-clean' title='清楚格式' />
          <button className='ql-direction' value='rtl' title='文本方向' />
          <button className='ql-image' value='image' title='插入图片' />
          <button className='ql-color' value='color' title='字体颜色' />
          <button className='ql-background' value='background' title='背景颜色' />
          {/* <select className='ql-align' title='对齐方式' defaultValue='left'>
            <option selected />
            {textAlignParam.map((v) => (
              <option key={v} value={v} />
            ))}
          </select> */}
          {/* <select className='ql-fontSize' title='字体大小' defaultValue='df'>
            {fontSizeParams.map((v) => (
              <option key={v} selected={v === 'df'} value={v} />
            ))}
          </select> */}
          {/* <select className='ql-fontWeight' title='字体粗细' defaultValue='regular'>
            {fontWeightParams.map((v) => (
              <option key={v} selected={v === 'regular'} value={v} />
            ))}
          </select> */}
        </div>
        <RichTextMain height={height} ref={quillEl} />
      </div>
    )
  }
)

export default RichText
