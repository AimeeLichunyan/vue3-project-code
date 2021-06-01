import { createRenderer } from "../runtime-core/render"
import { nodeOps } from "./nodeOps"
import { patchProp } from "./patchProp"
const renderOptions = {...nodeOps,patchProp}

function  ensureRenderer() {
    return createRenderer(renderOptions)
}



export function createApp (rootComponent) {
    console.log(rootComponent)
    // 根据组件,创建一个渲染器
    const app = ensureRenderer().createApp(rootComponent)
    const {mount} = app
    app.mount = function (container) {
        // 需要挂载的时候,讲容器情况,进行挂在
        container = document.querySelector(container)
        container.innerHTML = "";
        mount(container)
    }
    return app
}
