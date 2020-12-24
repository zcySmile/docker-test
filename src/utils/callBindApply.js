/*
 * @Author: zcySmile
 * @Date: 2020-12-25 04:12:38
 * @LastEditors: zcySmile
 * @LastEditTime: 2020-12-25 04:37:33
 * @Description:
 */
let obj = {
    name: 'zhang',
    getName: function() {
        console.log(this.name)
    }
}
let obj2 = {
    name: 'cheng'
}
Object.prototype._call = function(obj) {
    // let args = Array.from(arguments).slice(1)
    let args = Array.prototype.slice.call(arguments, 1)
    const fn = Symbol(this)
    obj[fn] = this
    let reuslt = obj[fn](...args)
    delete obj[fn]
    return reuslt
}
let fn = obj.getName
// console.log(fn())

// console.log('name', fn._call(obj2))
// fn._call(obj2)

Object.prototype._apply = function(obj) {
    let args = Array.prototype.slice.call(arguments, 1)
    let fn = Symbol(this)
    obj[fn] = this
    let reuslt = obj[fn](args)
    delete obj[fn]
    return reuslt
}

fn._apply(obj2)

Object.prototype._bind = function(obj) {
    let args = Array.from(arguments).slice(1)
    let fn = Symbol(this)
    obj[fn] = this
    return function() {
        obj[fn](...args, ...arguments)
    }
}

let bindFn = fn._bind(obj2)
bindFn(obj2)
