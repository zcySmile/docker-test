
Array.prototype._reduce = function (fn, initial) {
    let array = this
    // if(initial !== undefined && initial !==null) {
    //     result = fn(initial,array[0],0,array )
    // } else {
    //     result = this[0]
    // }

    let result = initial === undefined ? array[0] : fn(initial, array[0], 0, array)
    
    for(let i=1;i<array.length;i++) {
        result = fn(result,array[i],i,array)
    }
    return result
}


// let result = [1,2,3,4]._reduce((curr,item)=> {
//     return curr+item
// })

// console.log(result)


Array.prototype._filter = function (fn) {
    if(typeof fn !== 'function') {
        reutrn []
    }
    let array = this
    let result = []
    for(let i= 0;i<array.length;i++) {
        if(fn(array[i],i, array)) {
            result.push(array[i])
        }
    }    
    return result
}

console.log([1,2,3,4]._filter((item)=> item<3))


Array.prototype._map = function (fn) {
    if(typeof fn !== 'function') {
        throw Error('参数必须是方法')
    }
    let array = this
    let result = []
    for(let i = 0;i<array.length;i++) {
        result.push(fn(array[i],i,array))
    }
    return result
}