
export const isString = val => typeof val === 'string'
export const isArray = Array.isArray
export const isNumber = val => typeof val === 'number'

export const URLReg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/

export const validateURL = val => isString(val) && URLReg.test(val)

