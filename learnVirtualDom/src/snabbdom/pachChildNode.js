/*
 * @Author: zcySmile
 * @Date: 2021-01-03 17:17:19
 * @LastEditors: zcySmile
 * @LastEditTime: 2021-01-03 20:49:04
 * @Description: 
 */
import { createElement } from './patch.js'
import patchVnode from './patchVnode.js'

export default function (pNode, oldChd, newChild) {
      // oldChd he newChild  中都有children
      console.log('进入都是children')
      let newStartIndex =0
      let newEndIndex = newChild.length -1
      let oldStartIndex = 0
      let oldEndIndex = oldChd.length - 1
      let newStartNode = newChild[newStartIndex]
      let newEndNode = newChild[newEndIndex]
      let oldStartNode = oldChd[oldStartIndex]
      let oldEndNode = oldChd[oldEndIndex]

      while (newStartIndex <= newEndIndex && oldStartIndex <= oldEndIndex) {
          if (isSameChildNode(newStartNode, oldStartNode)) {
              console.log('进入新前和旧前')
              patchVnode(oldStartNode, newStartNode)
              oldStartNode = oldChd[++oldStartIndex]
              newStartNode = newChild[++newStartIndex]
          } else if (isSameChildNode(newEndNode, oldEndNode)) {
              // 新后 和 旧后
              patchVnode(oldEndNode, newEndNode)
              oldEndNode = oldChd[--oldEndIndex]
              newEndNode = newChild[--newEndIndex]
          } else if (isSameChildNode(newEndNode, oldStartNode)) {
              // 新后 和 旧前
              patchVnode(oldStartNode, newEndNode)
              oldEndNode.elm.after(oldStartNode.elm)
             // pNode.insertAfter(oldStartNode.elm, oldChd[oldEndIndex].elm)
              newEndNode = newChild[--newEndIndex]
              oldStartNode = oldChd[++oldStartIndex]
          } else if (isSameChildNode(newStartNode, oldEndNode)) {
              // 新前与旧后
              patchVnode(oldEndNode, newStartNode)
              pNode.insertBefore(oldEndNode.elm, oldChd[oldStartIndex].elm)
              newStartNode = newChild[++newStartIndex]
              oldEndNode = oldChd[--oldEndIndex]
          } else {
              let map = {}
              for (let i = oldStartIndex; i <= oldEndIndex; i++) {
                  let key = oldChd[i].key
                  if (key != undefined) {
                      map[key] = i
                  }
              }
              let keyToInd = map[newStartNode.key]
              if (keyToInd === undefined) {
                  // 新的元素
                  let dom = createElement(newStartNode)
                  pNode.insertBefore(dom, oldStartNode.elm)
              } else {
                  if (oldChd[keyToInd].sel !== newStartNode.sel) {
                      let dom = createElement(newStartNode)
                      pNode.insertBefore(dom, oldStartNode.elm)
                      
                  } else {
                      patchVnode(oldChd[keyToInd], newStartIndex)
                      map[newStartNode.key] = undefined
                      // 还需要移动当前的节点
                      pNode.insertBefore(oldChd[keyToInd].elm, oldStartNode.elm)
                  }
              }
              newStartNode = newChild[++newStartIndex]
          }
          
    }
      
    console.log(newStartIndex, newEndIndex)

    if (newStartIndex <= newEndIndex) {
        console.log('进入 while  后')
        while (newStartIndex <= newEndIndex) {
            let dom = createElement(newStartNode)
            newStartNode = newChild[++newStartIndex]
            const before = newChild[newEndIndex +1] ===null ? null : newChild[newEndIndex +1].elm
            pNode.appendChild(dom)
        }
    }
    if (oldStartIndex <= oldEndIndex) {
        while (oldStartIndex <= oldEndIndex) {
            pNode.removeChild(oldStartNode.elm)
            oldStartNode = oldChd[++oldStartIndex]
        }
    }
    

}
function isSameChildNode(newChildNode, oldChildNode) {
    console.log(newChildNode, oldChildNode)
    return newChildNode.key === oldChildNode.key && newChildNode.sel === oldChildNode.sel
}