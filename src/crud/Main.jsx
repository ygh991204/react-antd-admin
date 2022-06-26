import React, { useState, useCallback, useContext } from 'react'

const CrudMain = React.memo(({ children }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [selections, setSelections] = useState([])

  const selectionsHandle = useCallback((val, rows) => {
    setSelections(rows)
  }, [])

  const renderChildren = () => {
    return React.Children.map(children, child => {
      return React.cloneElement(child, {
        dataSource: data,
        loading: loading,
        rowSelection: {
          selections,
          selectionsHandle
        }
      })
    })
  }

  return <> { renderChildren() }</>
})

export default CrudMain
