export const isArray = Array.isArray

export function isString(val: any): val is string {
  return typeof val === 'string'
}

export function isFunction(val: any): val is Function {
  return typeof val === 'function'
}

export function isNumber(val: any): val is number {
  return typeof val === 'number'
}

export const URLReg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/

export function validateURL(val: any) {
  return isString(val) && URLReg.test(val)
}
