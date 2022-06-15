import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { Form } from 'antd'
import { delEmptyQueryNodes, wait } from '@/utils'
import { useStateSync } from '@/utils/hooks'
import { initData } from '@/api/data'
import { cloneDeep, merge } from 'lodash'
import { DEFAULT_OPTIONS, STATUS, NOTIFICATION, TITLE, HOOKS } from './common'
import CrudContext from './Context'

export function generateDefaultHooks() {
  return Object.values(HOOKS).reduce((prev, hook) => {
    prev[hook] = []
    return prev
  }, {})
}

const CrudProvider = React.memo((props) => {
  /** 合并配置 */
  const options = merge(DEFAULT_OPTIONS, { ...props, children: undefined })

  const formValues = useRef(options.defaultForm)

  const [form] = Form.useForm()

  const [tableSize, setTableSize] = useStateSync('default')
  const [data, setData, dataRef] = useStateSync([])
  const [selections, setSelections] = useStateSync([])
  const [loading, setLoading] = useState(false)
  const [status, setStatus, statusRef] = useStateSync(STATUS.RETRIEVE)
  const dataStatus = useRef([])
  const initQuery = useRef(true)

  const hooks = useRef(generateDefaultHooks())

  const addHook = useCallback((hookName, fn) => {
    const _hooks = hooks.current[hookName]
    if (!_hooks.filter(v => v === fn).length) {
      _hooks.push(fn)
    }
  }, [])

  const callHook = useCallback(async(hookNames, ...paylod) => {
    const _hooks = Object.keys(hooks.current).reduce((prev, hookName) => {
      if (hookNames.indexOf(hookName) !== -1) {
        prev.push(...hooks.current[hookName])
      }
      return prev
    }, [])
    if (_hooks.length) {
      try {
        const reslut = await Promise.all(_hooks.map(v => v(...paylod)))
        if (reslut.filter(v => v !== undefined && !v).length) {
          return false
        } else {
          return true
        }
      } catch (e) {
        return false
      }
    } else {
      return true
    }
  }, [])

  /**  */
  const [pageIndex, setPageIndex, pageIndexRef] = useStateSync(0)
  const [query, setQuery, queryRef] = useStateSync({ ...options.query })
  const [params, setParams, paramsRef] = useStateSync({ ...options.params })

  const [total, setTotal] = useState(0)

  const getRowId = useCallback((row) => {
    return row[options.idField]
  }, [])

  const diffDataStatus = useCallback((data, prev = []) => {
    return data.reduce((p, i) => {
      prev.push({
        id: getRowId(i),
        status: STATUS.RETRIEVE
      })
      if (i[options.childrenName] && i[options.childrenName].length) {
        diffDataStatus(i[options.childrenName], prev)
      }
      return prev
    }, prev)
  }, [])

  const selectionsHandle = useCallback((val, rows) => {
    setSelections(rows)
  }, [])

  const notificationHandle = useCallback(() => {
    NOTIFICATION[statusRef.current]()
  }, [])

  const visibleCu = useMemo(() => {
    return status === STATUS.UPDATE || status === STATUS.CREATE || status === STATUS.CREATE_SUBMIT || status === STATUS.UPDATE_SUBMIT
  }, [status])

  const loadingCu = useMemo(() => {
    return status === STATUS.CREATE_SUBMIT || status === STATUS.UPDATE_SUBMIT
  }, [status])

  const title = useMemo(() => {
    return TITLE[status] + options.title
  }, [options, status])

  const resetDataStatus = useCallback(() => {
    dataStatus.current = diffDataStatus(dataRef.current)
  }, [])

  const setRowsDataStatus = useCallback((rows = [], status) => {
    const ids = rows.map((v) => getRowId(v))
    const _dataStatus = cloneDeep(dataStatus.current)
    _dataStatus.forEach(v => {
      if (ids.indexOf(v.id) !== -1) {
        v.status = status
      }
    })
    dataStatus.current = _dataStatus
  }, [])

  /** 获取查询参数 */
  const getQueryParams = useCallback(() => {
    const _query = delEmptyQueryNodes(queryRef.current)
    const _params = delEmptyQueryNodes(paramsRef.current)
    return {
      ..._query,
      ..._params,
      pageIndex: pageIndexRef.current,
      pageSize: options.pageSize
    }
  }, [])

  /** 刷新 */
  const refresh = useCallback(async() => {
    const hookRes = await callHook([HOOKS.beforeRefresh], getQueryParams())
    if (!hookRes) {
      return
    }
    setLoading(true)
    try {
      const reslut = await initData(options.url, getQueryParams())
      const _data = reslut.data.list
      const _count = reslut.data.count
      setData([..._data])
      setTotal(_count)
      resetDataStatus()
      await wait(options.time)
      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
  }, [])

  /** 查询 */
  const toQuery = useCallback(async() => {
    if (initQuery.current) {
      const hookRes = await callHook([HOOKS.beforeInitQuery], getQueryParams())
      if (!hookRes) {
        return
      }
      initQuery.current = false
    }
    setPageIndex(1)
    await refresh()
  }, [])

  /** 重置参数 - 并查询 */
  const resetQuery = useCallback(async(query = true) => {
    setQuery({ ...options.query })
    const hookRes = await callHook([HOOKS.beforeReset], getQueryParams())
    if (!hookRes) {
      return
    }
    if (query) {
      await toQuery()
    }
  }, [])

  /** 分页改变 */
  const pageChangeHandle = useCallback((page) => {
    setPageIndex(page)
    refresh()
  }, [])

  const setFormValues = useCallback((values) => {
    const _formValues = merge(formValues.current, values)
    formValues.current = _formValues
    return formValues
  }, [])

  const setFormFilidsValue = useCallback((values) => {
    form.setFieldsValue(cloneDeep(values))
    return setFormValues(values)
  }, [])

  const resetForm = useCallback((data) => {
    form.resetFields()
    return setFormFilidsValue(data || options.defaultForm)
  }, [])

  const getSubmitForm = useCallback(async() => {
    const _formValues = await form.validateFields()
    return setFormValues(_formValues)
  }, [])

  /**  */
  const toCreate = useCallback(async() => {
    const form = resetForm()
    const hookRes = await callHook([HOOKS.beforeToCU, HOOKS.beforeToCreate], form, setFormFilidsValue)
    if (!hookRes) {
      return
    }
    setStatus(STATUS.CREATE)
  }, [])

  /** */
  const toUpdate = useCallback(async(data) => {
    const form = resetForm(data)
    const hookRes = await callHook([HOOKS.beforeToCU, HOOKS.beforeToUpdate], form, setFormFilidsValue)
    if (!hookRes) {
      return
    }
    setStatus(STATUS.UPDATE)
    setRowsDataStatus([data], STATUS.UPDATE)
  }, [])

  /** */
  const toDelete = useCallback(async rows => {
    setStatus(STATUS.DELETE)
    setRowsDataStatus(rows, STATUS.DELETE)
  }, [])

  /** */
  const createHandle = useCallback(async() => {
    setStatus(STATUS.CREATE_SUBMIT)
    try {
      const submitForm = await getSubmitForm()
      const hookRes = await callHook([HOOKS.beforeSubmitCU], submitForm, setFormValues)
      if (!hookRes) {
        return
      }
      await options.crudMethod.create(formValues.current)
      notificationHandle()
      refresh()
    } catch (e) {
      setStatus(STATUS.CREATE)
    }
  }, [])

  const updateHandle = useCallback(async() => {
    setStatus(STATUS.UPDATE_SUBMIT)
    setRowsDataStatus([data], STATUS.UPDATE_SUBMIT)
    try {
      const submitForm = await getSubmitForm()
      const hookRes = await callHook([HOOKS.beforeSubmitCU], submitForm, setFormValues)
      if (!hookRes) {
        return
      }
      await options.crudMethod.update(formValues.current)
      notificationHandle()
      refresh()
    } catch (e) {
      setStatus(STATUS.UPDATE)
      setRowsDataStatus([data], STATUS.UPDATE)
    }
  }, [])

  const submitDel = useCallback(async rows => {
    setStatus(STATUS.DELETE_SUBMIT)
    setRowsDataStatus(rows, STATUS.DELETE_SUBMIT)
    const ids = rows.map((v) => getRowId(v))
    try {
      await options.crudMethod.del(ids)
      if (dataRef.current.length === 1 && pageIndexRef.current !== 1) {
        setPageIndex(1)
      }
      notificationHandle()
      refresh()
    } catch (e) {
      setStatus(STATUS.DELETE)
      setRowsDataStatus(rows, STATUS.DELETE)
    }
  }, [])

  const submitCU = useCallback(async() => {
    if (statusRef.current === STATUS.CREATE) {
      await createHandle()
    } else if (statusRef.current === STATUS.UPDATE) {
      await updateHandle()
    }
  }, [])

  const cancelCU = useCallback(() => {
    setStatus(STATUS.RETRIEVE)
    resetDataStatus()
    resetForm()
  }, [])

  const cancelDel = useCallback(() => {
    setStatus(STATUS.RETRIEVE)
    resetDataStatus()
  }, [])

  useEffect(() => {
    if (options.queryOnPresenterCreated) {
      toQuery()
    }
  }, [])

  const contextValue = useMemo(() => {
    return {
      title,
      options,

      query,
      params,
      pageIndex,
      total,

      data,
      form,
      selections,

      loading,
      tableSize,
      status,
      visibleCu,
      loadingCu,

      setParams,
      setQuery,
      setTableSize,

      refresh,
      toQuery,
      resetQuery,

      pageChangeHandle,
      selectionsHandle,

      toCreate,
      toUpdate,
      toDelete,
      submitCU,
      submitDel,
      cancelCU,
      cancelDel,

      addHook
    }
  }, [
    title,
    options,
    query,
    params,
    pageIndex,
    total,
    data,
    form,
    selections,
    loading,
    tableSize,
    status,
    visibleCu,
    loadingCu
  ])

  return <CrudContext.Provider value={contextValue}>{props.children}</CrudContext.Provider>
})

export default CrudProvider
