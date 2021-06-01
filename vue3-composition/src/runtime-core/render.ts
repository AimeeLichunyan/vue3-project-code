import { ShapeFlags } from "../shared/shapFlags";
import { createAppAPI } from "./apiCreateApp"
import { createComponentInstace } from "./component";

export function createRenderer(options) { // options 是平台传过来的方法,不同的平台可以实现不同的逻辑
    return baseCreateRenderer(options)
    
}
function baseCreateRenderer(options) {
    const render = (vnode,container) => { // 渲染,讲虚拟节点vnode渲染到容器中 container
        // 需要将虚拟节点,变成真实节点挂在到容器上
        patch(null,vnode,container)
    }
    const mountElement = (n2,container) => {

    }
    const patchElement = (n1,n2,container) => {

    }
    const mountComponent = (initialVnode,container) =>{
        // 组件挂载逻辑 1. 创建组件的实例 2. 初始话组件,找到组件的render方法,3. 执行render
        // 组件实例要记录当前组件的状态
        const instance = initialVnode.component = createComponentInstace(initialVnode)
    }
    const updateComponent = (n1,n2,container) => {

    }
    const processElement = (n1,n2,container) => {
        if(n1==null) {
            mountElement(n2,container)
        }else {
            patchElement(n1,n2,container)
        }
    }
    const processComponent = (n1,n2,container) => {
        if(n1 == null) {
            mountComponent(n2,container)
        }else {
            updateComponent(n1,n2,container)
        }
    }
    const patch = (n1,n2,container) => {
        let {shapeFlag} = n2;
        if(shapeFlag & ShapeFlags.ELEMENT) {
            processElement(n1,n2,container)
        }else if(shapeFlag & ShapeFlags.STATEFUL_COMPONENT){
            processComponent(n1,n2,container)
        }
    }
    return {
        createApp: createAppAPI(render)
        
    }
}