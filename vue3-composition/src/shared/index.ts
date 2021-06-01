export const isObject = (val) => typeof val == 'object' && val !== null // 判断是否是对象
export const isSymbol = (val) => typeof val  === 'symbol';
export const isArray = Array.isArray
export const isInteger = (key) => '' + parseInt(key,10) === key
// 判断对象中是否存在某个属性
const hasOwnProperty = Object.prototype.hasOwnProperty
export const hasOwn = (val,key) => hasOwnProperty.call(val,key)
// 判断值是否存在变化
export const hasChanged = (value,oldValue) =>  value !== oldValue
export const isString = (value) => typeof value == 'string'
export * from './shapFlags'
