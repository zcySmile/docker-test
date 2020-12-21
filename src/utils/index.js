/*
 * @Author: your name
 * @Date: 2020-12-14 14:58:24
 * @LastEditTime: 2020-12-15 18:00:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \testvue2\src\utils\index.js
 */

const { Object } = require("core-js")





// // 防抖
// function debounce(fn, wait) {
//   let timer
//   return function () {
//     let _this = this
//     let args = arguments
//     if (timer) { clearTimeout(timer) }
//     timer = setTimeout(() => {
//       fn.applay(_this, args)
//     }, wait);
//   }
// }

// // 节流
// function root(fn, wait) {
//   let time = 0
//   return function () {
//     let _this = this
//     let args = arguments
//     let currentTime = Date.now()
//     if (now - time > wait) {
//       fn.applay(_this, args)
//       time = now
//     }
//   }
// }

// function thorttle(fn, wait) {
//   let timer
//   return function () {
//     let _this = this
//     let arg = arguments
//     if (!timer) {
//       timer = setTimeout(() => {
//         timer = null
//         fn.applay(_this, args)
//       }, wait);
//     }
//   }
// }


// //防抖

// function debounce(fn, wait) {
//   let timer
//   return function () {
//     let _this = this
//     let args = arguments
//     if (timer) {
//       clearTimeout(timer)
//     }
//     timer = setTimeout(() => {
//       fn.applay(_this, args)
//     }, wait)
//   }
// }


// // 节流

// function thorttle(fn, wait) {
//   let timer
//   return function () {
//     let _this = this
//     if (!timer) {
//       timer = setTimeout(() => {
//         fn.applay(_this, arguments)
//       }, wait);
//     }
//   }
// }


// // 通过intersectionObserver 实现图片懒加载

// const io = new IntersectionObserver(callback)

// const imgs = document.querySelectorAll('[data-src]')  // 获取需要懒加载的所有图片节点

// function callBack(entries) {
//   entries.forEach(item => {
//     if (item.isIntersecting) {
//       item.target.src = item.target.dataset.src
//       io.unobserve(item.target)
//     }
//   })
// }

// imgs.forEach(item => {
//   io.observe(item)
// })

// // 防抖
// function debboute(fn, wait) {
//   let timer
//   return function () {
//     let _this = this
//     if (timer) {
//       clearTimeout(timer)
//     }
//     timer = setTimeout(() => {
//       fn.applay(_this, arguments)
//     }, wait);
//   }
// }

// // 节流

// function threrrote(fn, wait) {
//   let timer
//   return function () {
//     if (!timer) {
//       timer = setTimeout(() => {
//         timer = null
//         fn.applay(this, arguments)
//       }, wait);
//     }
//   }
// }

// // 事件代理

// document.getElementById('father_id').onclick = function (event) {
//   event = event || window.event
//   let target = event.target
//   if (target.nodeName.toLowerCase() === '') {

//   }
// }

// 扁平化
// flat
function isArray(arr) {
  return Object.prototype.toString.call(arr).slice(8, -1) === 'Array'
}

function myFlat(arr) {
  if (isArray(arr)) {
    arr.forEach((item, index) => {
      if (isArray(item)) {
        arr[index] = myFlat(item)
      }
    })
  }
  return arr.flat()
}

function myFlat2(arr) {
  if (Array.isArray(arr)) {
    arr.forEach((item, index) => {
      if (Array.isArray(item)) {
        arr[index] = myFlat2(item)
      }
    })
    return arr.flat()
  }
}

function myFlat3(arr) {
  if (Array.isArray(arr)) {
    for (let i = 0; i < arr.length - 1; i++) {
      if (Array.isArray(arr[i])) {
        arr[i] = myFlat3(arr[i])
      }
    }
    return arr.flat()
  }
}

// 去重 
// 利用set 可以 去重一维基本类型数组

// let doubleArray = [1, 2, 2, 234, { a: 1 }, { a: 1 }]

// console.log(Array.from(new Set(doubleArray))) // 无法去掉重复的Object 类型

let testArr = [1, 1, 'true', 'true', true, true, 15, 15, false, false, undefined, undefined, null, null, NaN, NaN, 'NaN', 'NaN', 0, 0, 'a', 'a', {}, {}];

// reduce 去重
// 无法去掉重复的Object 类型//
function quchogn(arr) {
  return arr.reduce((pre, curr, index) => {
    pre.includes(curr) ? '' : pre.push(curr)
    return pre
  }, [])
}

//  可以区别object, NaN
function quchong2(arr) {
  let set = new Set()
  return arr.filter(item => {
    let id = item + JSON.stringify(item)  // 不加item  无法区分null NaN   因为JSON.strigify(NaN) === null
    if (set.has(id)) return false
    set.add(id)
    return true
  })
}
// console.log(Array.from(new Set(testArr)))
// console.log(quchogn(testArr))
// console.log(quchong2(testArr))

// 浅拷贝
// 展开运算符浅拷贝 {...data}
// Object.assigin({}, data)
function copy(data) {
  let temp = Array.isArray(data) ? [] : {}
  Object.keys(data).forEach(key => { temp[key] = data[key] })
  return temp
}


function myPromise(fn) {
  this.status = 'pending'
  this.value = ''
  this.reason = ''

  this.onFulfiledCallBack = []
  this.onRejectCallBack = []
  const resolve = (data) => {
    console.log('resolve', this.status)
    if (this.status === 'pending') {
      this.value = data
      this.status = 'fulfiled'
      this.onFulfiledCallBack.forEach(fn => {
        fn(this.value)
      })
    }
  }
  const reject = (data) => {
    if (this.status === 'pending') {
      this.value = data
      this.status = 'rejected'
      this.onRejectCallBack.forEach(fn => {
        console.log('add')
        fn(this.value)
      })
    }
  }
  fn(resolve, reject)
}

myPromise.prototype.then = function (onFulfiled, onReject) {
  const promise2 = new Promise((resolve, reject) => {
    if (this.status === 'fulfiled') {
      let nextData = onFulfiled(this.value)
      resolve(nextData)
    }
    if (this.status === 'rejected') {
      let nextReason = onReject(this.value)
      reject(nextReason)
    }
    if (this.status === 'pending') {
      this.onFulfiledCallBack.push(onFulfiled)
      this.onRejectCallBack.push(onReject)
    }
  })
  return promise2
}

const myInstance = new myPromise((resolve) => {
  setTimeout(() => {
    resolve('123')
  }, 1000)
})

myInstance.then((data) => {
  console.log(data)
})


// class Mypromise {
//   constructor(executor) {
//     this.status = 'pending'
//     this.data = ''
//     this.reason = ''
//     executor(resolve, reject)
//   }
//   resolve(data) {
//     if (this.status === 'pending') {
//       this.status = 'resolved'
//       this.data = data
//     }
//   }
//   reject(reason) {
//     if (this.status === 'pending') {
//       this.reason = reason
//       this.status = 'rejected'
//     }
//   }


// }





class sPromise {
  constructor(executor) {
    this.value = ''
    this.status = 'pending'
    this.reason = ''
    this.fullfiledCallback = []
    this.rejectedCallback = []
    const resolve = (data) => {
      if (this.status === 'pending') {
        this.status = 'fullfiled'
        this.value = data
      }
    }
    const reject = (reason) => {
      if (this.status === 'pending') {
        this.status = 'rejected'
        this.reason = reason
      }
    }
    executor(resolve, reject)
  }

  then(onFullFiled, onRejected) {
    return new sPromise((resolve, reject) => {
      if (this.status === 'fullfiled') {
        if (onFullFiled && typeof onFullFiled === 'function') {
          try {
            const result = onFullFiled(this.value)
            resolve(result)
          } catch (e) {
            reject(e)
          }
        } else {
          resolve(this.value)
        }
      }
      if (this.status === 'rejected') {
        if (onRejected && typeof onRejected === 'function') {
          try {
            const result = onRejected(this.reason)
            resolve(result)
          } catch (e) {
            reject(e)
          }
        }
        else {
          resolve(this.value)
        }
      }
      if (this.status === 'pending') {
        this.fullfiledCallback.push(() => {
          onFullFiled(this.value)
        })
        this.rejectedCallback.push(() => {
          onRejected(this.value)
        })
      }
    })
  }
}