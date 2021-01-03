/*
 * @Author: zcySmile
 * @Date: 2021-01-03 09:39:11
 * @LastEditors: zcySmile
 * @LastEditTime: 2021-01-03 17:04:11
 * @Description: 
 */
export default function (sel, data, children, text, elm) {
    let key = data.key || undefined
    return {
        sel,
        data,
        children,
        text,
        elm,
        key
    }
}