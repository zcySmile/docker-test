/*
 * @Author: zcySmile
 * @Date: 2021-01-03 09:37:52
 * @LastEditors: zcySmile
 * @LastEditTime: 2021-01-03 09:55:08
 * @Description: 
 */
import vnode from './vnode.js'
// 三个参数，sel, data, c（c可能是文本，数组，或者vnode实例）
function h(sel, data, c) { 
    if (arguments.length !== 3) {
        throw new Error('必须三个参数')
    }
    // 检查c的类型
    if (typeof c === 'string' || typeof c === 'number') {
        return  vnode(sel,data,undefined,c,undefined)
    } else if (Array.isArray(c)) {
        return vnode(sel,data,c,undefined,undefined)
    } else if (typeof c === 'object' && c.hasOwnProperty('sel')) {
        return vnode(sel,data,[c],undefined,undefined)
    } else {
        throw new Error('第三个参数形式不对')
    }
}


export default h