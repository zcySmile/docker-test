/*
 * @Author: zcySmile
 * @Date: 2020-12-26 16:11:27
 * @LastEditors: zcySmile
 * @LastEditTime: 2020-12-26 16:16:14
 * @Description:
 */
let obj = {
    name: 'set'
}

let obj2 = obj
let weakset = new WeakSet()
weakset.add(obj)
obj = null
obj2 = null
console.log(weakset)
console.log(weakset[0])
