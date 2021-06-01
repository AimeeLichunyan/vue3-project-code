import { hasChanged, hasOwn, isArray, isInteger, isObject, isSymbol } from "../shared/index";
import { reactive } from "./reactive";
import{track, trigger} from './effect'
//  设置一个工厂函数
function createGetter() {
     // 获取对象中得属性执行此方法
    return function get(target, key, receiver) {
        const res = Reflect.get(target, key, receiver);
        if (isSymbol(key)) { // 判断是否是symbol,如果是则忽略
            return res
        }
        // 依赖收集
        console.log(key,'key')
        track(target,key);
        // 不是得话就取值代理
        // 取值得时候再对对象进行代理,懒递归
        if (isObject(res)) { 
            return reactive(res);
        }
        return res
    }
}
function createSetter() {
    // 设置属性值得时候执行此方法
    return function set(target, key,value, receiver) {
        // vue2 不支持新增属性
        // 区分新增 or 修改
        const oldValue = target[key]; // 如果是修改,那肯定就存在老值
        // 有两种逻辑,第一种是:数组新增得逻辑,第二种是对象得逻辑
        const hadKey=isArray(target) && isInteger(key) ? Number(key) < target.length: hasOwn(target,key)
        const result = Reflect.set(target,key,value,receiver)
        if(!hadKey) {
            trigger(target,'add',key,value)
        }else if(hasChanged(value,oldValue)) {
            console.log('修改属性')
        }
        return result
    }
}
const get = createGetter();
const set = createSetter()

export const mutableHandlers = {
    get, 
    set 
}