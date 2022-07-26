import React, { useRef, useEffect, useCallback } from 'react'

import Quill, { SelectionChangeHandler } from 'quill'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

interface RichTextProps {
  value?: string
  disabled?: boolean
  placeholder?: string
  onChange?: (html: string, text: string, quill: Quill) => void
  onFocus?: (quill: Quill) => void
  onBlur?: (quill: Quill) => void
}

const RichText = React.forwardRef<{}, RichTextProps>(
  ({ placeholder = '请输入', value = '', disabled = false, onChange, onBlur, onFocus }, ref) => {
    const quillEl = useRef<HTMLDivElement>(null)
    const myQuill = useRef<Quill>()
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
          readOnly: false
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
        <div ref={quillEl} />
      </div>
    )
  }
)

export default RichText
