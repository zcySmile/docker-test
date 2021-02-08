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




// 自己默写练习

// function exerciseCall(obj,...args) {
//     let fn = this   // 调用的额时候肯定是fn.exerciseCall(obj)这样调用，所以this就是fn
//     let sybmol = new Symbol(fn)
//     obj[fn] = fn
//     let result = obj[fn](...args)
//     delete result[fn]
//     return result
// }

// function exerciseApply(obj) {
//     let fn = this
//     obj[fn] = this
//     let args = Array.prototype.slice.call(arguments, 1)
//     let result = obj.fn(args)
//     return result
// }

// function exersiceBind(obj) {
//     let args = Array.prototype.slice.call(arguments, 1)
//     obj.fn = this
//     return  ()=> {
//         obj.fn(...args,...arguments)
//     }
// }