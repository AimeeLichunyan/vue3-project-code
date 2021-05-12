import { isObject } from "../shared/index"

const mutableHandlers = {
    get() {

    }, 
    set() {

    }
}
export function reactive(target) {
    // 将目标转化成响应得对象，使用得是Proxy
    return crateReactiveObject(target,mutableHandlers) // 核心操作是，读取当前文件时，做依赖收集，当数据变化时，需要重新执行reactive
    
}
function crateReactiveObject(target,baseHandlers) {
    // 如果不是对象直接返回值
    if(!isObject(target)) {
        return target
    }
    const proxy = new Proxy(target,baseHandlers)
    // 为什么proxy解决了性能问题： 只是对对象得最外层做了代理，默认不会递归，而且不会重新重写对象中得属性
    return proxy
}