
import { useState } from 'react'
import { Form } from 'antd'
import CrudContext from './Context'

const Provider = ({ children }) => {
  const [form] = Form.useForm()
  //   const
  const value = null
  return <CrudContext.Provider value={ value }>{ children }</CrudContext.Provider>
}

export default Provider
