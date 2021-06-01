import { isArray, isInteger } from "../shared/index";

export function effect(fn, options: any = {}) {
    const effect = createReactiveEffect(fn, options)
    if (!options.lazy) {
        effect()
    }
    return effect
}
let activeEffect; // 用了存储当前的effect
let uid = 0;
const effectStack = []
function createReactiveEffect(fn, options) {
    const effect = function () {
        if(!effectStack.includes(effect)) { // 防止递归执行
            try {
                activeEffect = effect;
                effectStack.push(activeEffect)
                return fn()
            } finally {
                effectStack.pop()
                activeEffect = effectStack[effectStack.length - 1]
            }
        }
    }
    effect.id = uid++;
    effect.deps = [] // 用来表示effect中依赖了哪些属性
    effect.options = options
    return effect
}
const targetMap = new WeakMap()
export function track(target, key) {
    if (activeEffect == undefined) {
        return
    }
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()))
    }
    let dep = depsMap.get(key);
    if (!dep) {
        depsMap.set(key, dep = new Set)
    }
    if (!dep.has(activeEffect)) {
        dep.add(activeEffect);
        activeEffect.deps.push(dep) // 双向记忆的过程
    }
}
export function trigger(target,type,key,value?,oldValue?) {
    const depsMap = targetMap.get(target);
    if(!depsMap) {
        return
    }
    const run = effects => {
        if(effects) effects.forEach(effect=>effect())
    }
    // 数组有特殊情况
    if(key === 'length' && isArray(target)) {
        depsMap.forEach((dep,key) => {
            run(dep)
        });
    }else {
        // 对象处理
        if(key != void 0) { // 说明修改了key
            run(depsMap.get(key))
        }
        switch (type) {
            case 'add':
                if(isArray(target)) {
                    if(isInteger(key)){
                        run(depsMap.get('length')) // 如果页面中直接使用了数组也会对数组直接使用了数组,也会对数组进行取值操作.length进行收集,新增属性时直接触发length即可
                    }
                }
                break;
        
            default:
                break;
        }
    }
    
}
