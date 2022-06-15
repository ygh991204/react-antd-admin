import { useContext, useCallback } from 'react'
import CrudContext from './Context'
import { HOOKS } from './common'

export const useCrudHook = (hookName, fn) => {
  const { addHook } = useContext(CrudContext)
  const _fn = useCallback(fn, [])
  addHook(hookName, _fn)
}

export const useBeforeRefresh = (fn) => {
  useCrudHook(HOOKS.beforeRefresh, fn)
}
export const useBeforeReset = (fn) => {
  useCrudHook(HOOKS.beforeReset, fn)
}
export const useBeforeToCU = (fn) => {
  useCrudHook(HOOKS.beforeToCU, fn)
}
export const useBeforeToCreate = (fn) => {
  useCrudHook(HOOKS.beforeToCreate, fn)
}
export const useBeforeToUpdate = (fn) => {
  useCrudHook(HOOKS.beforeToUpdate, fn)
}
export const useBeforeSubmitCU = (fn) => {
  useCrudHook(HOOKS.beforeSubmitCU, fn)
}
export const useBeforeInitQuery = (fn) => {
  useCrudHook(HOOKS.beforeInitQuery, fn)
}
