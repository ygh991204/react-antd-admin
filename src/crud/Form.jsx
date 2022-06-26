
// import
import React from 'react'
import { Form } from 'antd'

const CrudForm = ({ children }) => {
  const [form] = Form.useForm()
  const renderChildren = () => {
    return React.Children.map(children, child => {
      return React.cloneElement(child, {
        form: form
      })
    })
  }
  return (
    <>
      { renderChildren() }
    </>
  )
}

export default CrudForm
