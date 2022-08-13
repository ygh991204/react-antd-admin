
declare global {
  declare type ITypeObject<T> = Record<any, T>
  declare type IAnyObject = ITypeObject<any>
}

export default {}
