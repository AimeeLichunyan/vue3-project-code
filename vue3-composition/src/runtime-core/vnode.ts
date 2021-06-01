import { isArray, isObject, isString, ShapeFlags } from "../shared/index"

export function createVnode(type,props={},children = null) {
    // 判断是元素还是组件
    const shapeFlag = isString(type) ? ShapeFlags.ELEMENT : isObject(type) ? ShapeFlags.STATEFUL_COMPONENT : 0
    // type: 字符串或者对象
    const vnode = {
        // 虚拟节点可以标识dom结构,也可以用表示组件
        type,
        props,
        children,
        component:null, // 组件的实例
        el:null, // 虚拟节点和真实节点做一个映射关系
        // key: props.key,
        shapeFlag // vue3非常优秀的做法 虚拟节点的类型,元素,组件
    }
    if(isArray(children)) {
        vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN // 或运算,有一个是1就是1,就是把两个数相加
    }else {
        vnode.shapeFlag |= ShapeFlags.TEXT_CHILDREN
    }
    return vnode;
}