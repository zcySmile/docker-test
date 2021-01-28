/*
 * @Author: zcySmile
 * @Date: 2021-01-03 10:59:14
 * @LastEditors: zcySmile
 * @LastEditTime: 2021-01-03 13:50:17
 * @Description: 
 */
import vnode from './vnode.js'
import patchVnode from './patchVnode.js'
export default function (oldVnode, newVnode) {
    console.log('jinru patch')
    //判断老的vnode是不是虚拟节点
    if (!oldVnode.sel) {
        // dom节点，包装成虚拟节点
        let sel = oldVnode.tagName.toLowerCase()
        oldVnode = vnode(sel, {}, [], undefined, oldVnode)
    }
   // 判断是不是同一个节点
    if(oldVnode.sel === newVnode.sel && oldVnode.key === newVnode.key)
    {
        // 同一个节点，精细比较
        patchVnode(oldVnode,newVnode)
    } else {
        console.log('jinru createElement')
        // 不是同一个节点，删除旧的，插入新的
        let dom = createElement(newVnode)
        if (oldVnode.elm && oldVnode.elm.parentNode) {
        oldVnode.elm && oldVnode.elm.parentNode.insertBefore(dom, oldVnode.elm)
            // 删除老的节点
           oldVnode.elm.parentNode.removeChild(oldVnode.elm)
        }
        
    }
} 

// 创建真正的节点，将vnode创建为domd
export function createElement(vnode) {
    let domNode = document.createElement(vnode.sel)
    if (vnode.text && (!vnode.children || vnode.children.length === 0)) {
        domNode.innerText = vnode.text
        // 将这个节点渲染在页面上，上树
        // pivot.parentNode.insertBefore(domNode,pivot)
        vnode.elm = domNode   //  虚拟节点的elm属性保存的是他真是的dom节点
    } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
        let fragment = document.createDocumentFragment()
        for (let i = 0; i < vnode.children.length; i++) {
            // 一旦调用createElement 就意味着当前虚拟dom的elm属性就有了值，并且值为真是创建的dom
           fragment.appendChild(createElement(vnode.children[i]))
        }
        domNode.appendChild(fragment)
        fragment = null
        vnode.elm = domNode
    }
    return vnode.elm
}