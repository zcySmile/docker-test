/*
 * @Author: zcySmile
 * @Date: 2021-01-03 13:21:58
 * @LastEditors: zcySmile
 * @LastEditTime: 2021-01-03 19:18:52
 * @Description: 
 */
import patchChildNode from './pachChildNode.js'
import patch, {createElement} from './patch.js'
export default function (oldVnode, newVnode) {
    console.log('进入patchVnode')
    if (oldVnode === newVnode) {
        return
    }
    if (newVnode.text && (!newVnode.children || newVnode.children.length === 0)) {
        console.log(oldVnode)
       oldVnode.elm.innerText = newVnode.text
    } else {// 新的节点中有children 
        if (oldVnode.text) {// 老的节点中是text
            oldVnode.elm.innerHTML = ''
            for (let i = 0; i < newVnode.children.length; i++) {
                let dom = createElement(newVnode.children[i])
                oldVnode.elm.appendChild(dom)
            }
        } else {
          patchChildNode(oldVnode.elm, oldVnode.children,newVnode.children)
        }
   }
}

