
import { useState, useMemo } from 'react'
import { Form } from 'antd'
import CrudContext from './Context'

const defalutOptions = {
  idField: 'id',
  title: '',
  url: '',
  query: {},
  params: {},
  defaultForm: {},
  crudMethod: {
    add: (form) => {},
    del: (id) => {},
    edit: (form) => {},
    get: (id) => {}
  },
  operationShow: {
    add: true,
    del: true,
    reset: true
  },
  props: {},
  queryOnPresenterCreated: true
}

const Provider = (props) => {
  const options = Object.assign({}, defalutOptions, { })
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [query, setQuery] = useState({ ...options.query })
  const [params, setParams] = useState({ ...options.params })

  const contextValue = useMemo(() => {
    return {

    }
  }, [form, data, pageSize, pageIndex, total, query, params])

  return <CrudContext.Provider value={ null }>{ props.children }</CrudContext.Provider>
}

export default Provider
