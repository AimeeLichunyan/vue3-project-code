import { isObject } from "../shared/index"
import { mutableHandlers } from "./baseHandlers"


export function reactive(target) {
    // 将目标转化成响应得对象，使用得是Proxy
    return crateReactiveObject(target,mutableHandlers) // 核心操作是，读取当前文件时，做依赖收集，当数据变化时，需要重新执行reactive
    
}
const proxyMap = new WeakMap() // 为数据做个映射
function crateReactiveObject(target,baseHandlers) {
    // 如果不是对象直接返回值
    if(!isObject(target)) {
        return target
    }
    const exisitingProxy = proxyMap.get(target) // 判断map数据中是否存在目标元素，如果存在得话，就不用进行代理，如果不存在得话，就进行代理
    if(exisitingProxy) {
        return exisitingProxy
    }

    const proxy = new Proxy(target,baseHandlers)
    proxyMap.set(target,proxy) // 将代理后得数据存在map中
    // 为什么proxy解决了性能问题： 只是对对象得最外层做了代理，默认不会递归，而且不会重新重写对象中得属性
    return proxy
}