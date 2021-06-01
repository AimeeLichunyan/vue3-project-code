// 节点的相关操作
export const nodeOps = {
    createElement(type) { // 创建元素
        return document.createElement(type)
    },
    setElementText(el,text) { // 设置文本
        el.textContent = text
    },
    insert(child,parent,anchor = null) { // 插入子节点 anchor = null 插入的位置,如果没有就插入最后
        parent.insertBefore(child,anchor)
    },
    remove(child) { // 删除子节点
        const parent = child.parentNode;
        if(parent) {
            parent.removeChild(child)
        }
    }
}