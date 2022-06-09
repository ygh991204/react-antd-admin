
import { useContext } from 'react'
import CrudContext from './Context'

/**
 * 刷新之前
 * @param {function} fn
 */
export const useCrudBeforeRefresh = (fn) => {
  const crud = useContext(CrudContext)
}

/**
 * 刷新之后
 * @param {function} fn
 */
export const useCrudAfterRefresh = (fn) => {
  const crud = useContext(CrudContext)
}

/**
 * 删除之前
 * @param {function} fn
 */
export const useCrudBeforeDelete = (fn) => {
  const crud = useContext(CrudContext)
}

/**
 * 删除之后
 * @param {function} fn
 */
export const useCrudAfterDelete = (fn) => {
  const crud = useContext(CrudContext)
}

/**
 * 新建之前
 * @param {function} fn
 */
export const useCrudBeforeAdd = (fn) => {

}

/**
 * 新建之后
 * @param {function} fn
 */
export const useCrudAfterAdd = (fn) => {

}
