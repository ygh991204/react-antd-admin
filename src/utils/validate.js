
export const isString = val => typeof val === 'string'
export const isArray = Array.isArray
export const isFunction = fn => typeof fn === 'function'

export function isNumber(val) {
  return typeof val === 'number'
}

export const URLReg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/

export function validateURL(val) {
  return isString(val) && URLReg.test(val)
}

