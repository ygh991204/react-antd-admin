
import React from 'react'

export const CrudContext = React.createContext(null)

if (process.env.NODE_ENV !== 'production') {
  CrudContext.displayName = 'Crud'
}

export default CrudContext
