function patchClass(el,value) {
    if(value == null) {
        value = ''
    }
    el.className = value
}
function patchStyle(el,prev,next) {
    const style = el.style
    if(!next) { // 新的没有样式
        el.removeAttribute('style')
    }else {
        for(let key in next) { // 老的也有新的也有样式需要替换
            style[key] = next[key                       ]
        }
        if(prev) { // 老的有样式新的没有样式
            for(let key in prev) {
                if(next[key] == null) {
                    style[key] = ''
                }
            }
        }
    }
}
function patchAttr(el,key,value) {
    if(value == null) {
        el.removeAttribute(key)
    }else {
       el.setAttribute(key,value) 
    }
}
export function patchProp(el,key,preValue,nextValue) {
    switch (key) {
        case 'class':
            patchClass(el,nextValue) // 比较class
            break;
        case 'style':
            patchStyle(el,preValue,nextValue) // 比较属性
            break
        default:
            patchAttr(el,key,nextValue)
            break;
    }
}