
import React, { useState, useImperativeHandle, useRef, useCallback, useEffect } from 'react'
import { v1 as uuidv1 } from 'uuid'
import _Quill from 'quill'
import styled from 'styled-components'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

const Quill = window.Quill || _Quill

const textAlignParams = ['right', 'center']
const headerParams = ['1', '2', '3', '4', '5', '6']

const AlignStyle = Quill.import('attributors/style/align')
AlignStyle.whitelist = [...textAlignParams]
AlignStyle.keyName = 'text-align'
Quill.register(AlignStyle, true)

const RichTextWrapper = styled.div`
   background-color: #fff;
`

const RichTextInner = styled.div`
   height: ${props => props.height};
   overflow-x: hidden;
   overflow-y: auto;
`

const RichText = React.forwardRef(({ placeholder = '请输入', disabled = false, height = '500px' }, ref) => {
  const [toolBarId] = useState('richText-toolbar_' + uuidv1())
  const quillEl = useRef(null)
  const quill = useRef(null)

  useImperativeHandle(ref, () => (
    {

    }
  ))

  const quillSelectionChange = useCallback(() => {

  }, [])

  const quillTextChange = useCallback(() => {

  }, [])

  const createQuill = useCallback(() => {
    const _quill = new Quill(quillEl.current, {
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'], // toggled buttons
          ['blockquote', 'code-block'],

          [{ 'header': 1 }, { 'header': 2 }], // custom button values
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
          [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
          [{ 'direction': 'rtl' }], // text direction

          [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

          [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
          [{ 'font': [] }],
          [{ 'align': [] }],

          ['clean']
        ]
        // toolbar: {
        //   container: '#' + toolBarId
        //   handlers: {
        //     'image': this._customImageHandler
        //   }
        // }
      },
      placeholder: placeholder,
      readOnly: false,
      theme: 'snow'
    })
    _quill.on('selection-change', quillSelectionChange)
    _quill.on('text-change', quillTextChange)
    return _quill
  }, [])

  useEffect(() => {
    quill.current = createQuill()
    return () => {

    }
  }, [])

  return (
    <RichTextWrapper>
      {/* <div id={toolBarId}>
        <button className='ql-bold' title='加粗'/>
        <button className='ql-italic' title='斜体' />
        <button className='ql-underline' title='下划线' />
        <button className='ql-strike' title='删除线' />
        <button className='ql-clean' title='清楚格式' />
        <button className='ql-image' value='image' onChange={() => {}} title='插入图片' />
        <select className='ql-color' value='color' onChange={() => {}} title='字体颜色' />
        <select className='ql-align' defaultValue='' title='对齐方式' onChange={() => {}}>
          <option value='' onChange={() => {}}/>
          {textAlignParams.map(v => (
            <option key={v} value={v} onChange={() => {}}/>
          ))}
        </select>
        <select className='ql-header' defaultValue='' title='段落格式' onChange={() => {}}>
          <option value='' onChange={() => {}}>正文</option>
          {headerParams.map(v => (
            <option key={v} value={v} onChange={() => {}}/>
          ))}
        </select>
      </div> */}
      <RichTextInner height={height}>
        <div ref={quillEl} />
      </RichTextInner>
    </RichTextWrapper>
  )
})

export default RichText

