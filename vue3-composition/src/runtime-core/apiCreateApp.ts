import { createVnode } from "./vnode"

export function createAppAPI(render) {
    return (rootComponent ) =>{
        const app = {
            mount(container) {
                // 用户再这里调用mount方法
                // 创建虚拟节点
                const vnode = createVnode(rootComponent)
                render(vnode,container)
            }
        }
        return app
    }
}