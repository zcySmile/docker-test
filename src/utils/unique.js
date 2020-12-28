// 数组去重方法
let testArr = [1, 1, 'true', 'true', true, true, 15, 15, false, false, undefined, undefined, null, null, NaN, NaN, 'NaN', 'NaN', 0, 0, 'a', 'a', {}, {}];
function unique1 (arr) {
    return Array.from(new Set(arr))
}
console.log('unique1', unique1(testArr)) // [ 1, 'true', true, 15, false, undefined, null, NaN, 'NaN', 0, 'a', {}, {} ]  无法去除相同的object对象


function unique2(arr) {
    return arr.reduce((pre,curr) => {
        pre.includes(curr) ? '' : pre.push(curr)
        return pre
    },[])
}
    
console.log('unique2', unique2(testArr)) // [ 1, 'true', true, 15, false, undefined, null, NaN, 'NaN', 0, 'a', {}, {} ]  无法去除相同的object对象


// 改进的reduce方法

function unique3(arr) {
    let set = new Set()
    return arr.reduce((pre,curr)=>{
        let value = JSON.stringify(curr)
        if(!set.has(value)){
            pre.push(curr)
            set.add(value)
        }
        return pre
    },[])
}

console.log('unique3', unique3(testArr))  //[ 1, 'true', true, 15, false, undefined, null, 'NaN', 0, 'a', {} ]    会将null, NaN当成相等的数据，  因为JSON.strigify(NaN) === null,    

//再次 改进的reduce方法

function unique4(arr) {
    let set = new Set()
    return arr.reduce((pre,curr)=>{
        let value = JSON.stringify(curr) + curr
        if(!set.has(value)){
            pre.push(curr)
            set.add(value)
        }
        return pre
    },[])
}

console.log('unique4', unique4(testArr)) //[ 1, 'true', true, 15, false, undefined, null, NaN, 'NaN', 0, 'a', {} ]  完美

// unique4 也可以使用filter实现
function unique4(arr){
    let set = new Set()
    return arr.filter(item=>{
        let id = JSON.stringify(item)+item
        if(set.has(id)) return false
        set.add(id)
        return true
    })
}

console.log('unique5', unique5(testArr))//[ 1, 'true', true, 15, false, undefined, null, NaN, 'NaN', 0, 'a', {} ]