

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

import { all, resolve } from "core-js/fn/promise"
import { construct } from "core-js/fn/reflect"

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



// sleep函数

function sleep(time) {
  return new Promise(resolve=>{
    setTimeout(resolve, time)
  })
}
function sleep2(time) {
  let feature = new Date().getTime() + parseInt(time, 10)
  while (new Date().getTime < feature) {
    continue
  }
}


// 防抖， 如果在一定的间隔内从新触发了事件，那么不执行而是将执行时间推迟到设定的间隔之后

// function debbule(time) {
//    let timer 
//    return function(fn) {
//      if(timer) {timer = null}
//      timer = setTimeout(()=> {
//        fn.call(this)
//      }, time)
//    }
// }

function debounce(fn, time) {
  let timer 
  return ()=> {
    if(timer) clearTimeout(timer)
    timer = setTimeout(()=> {
      fn.call(this,...arguments)
    }, time)
  }
}

// 节流， 每隔一定的时间执行一次
// function threthod(time) {
//   let timer
//   return function(fn) {
//     if(timer) return
//     timer = setTimeout(()=> {
//       timer = null
//       fn.call(this)
//     },time)
//   }
// }

function thorttle(fn,time) {
  let timer
  return ()=> {
    if(!timer) {
      setTimeout(()=> {
        timer = null
        fn.call(this, ...arguments)
      })
    }
  }
}


// 手写instanceof 原理

function myInstanceof(letf, right) {
  let proto = left.__proto__
  let isInstance = false
  while(proto) {
    if(proto === right.prototype) {
      isInstance = true
      break
    }
    proto = proto.__proto__
  }
  return isInstance
}


class MP {
  construct(executor) {
    this.status = 'pending',
    this.value = ''
    this.error = ''
    this.onFullFiledCb= []
    this.onRejectedCb = []

    function resolve(value) {
      if(this.status === 'pending') {
        this.value = value
        this.status = 'resolved'
        this.onFullFiledCb.forEach(cb => {
          cb(this.value)
        })
      }
    }

    function reject(error) {
      if(this.status === 'pending') {
        this.status === 'rejected'
        this.error = error
        this.onRejectedCb.forEach(cb => {
          cb(this.error)
        })
      }
    }

    executor(resolve, reject)
  }

  then(fullFied, rejected) {
    let  p= new MP((resolve,reject) => {

      if(typeof fullFied !== 'function') {
        fullFied = (value) => {
          resolve(value)
        }
      }
      if(typeof rejected !== 'function') {
        rejected = (value)=> {
          resolve(value)
        }
      }


      if(this.status === 'resolved') {
        this.parse(p, fullFied(this.value), resolve,reject)
      } else if(this.status === 'rejected') {
        this.parse(p,rejected(this.error), resolve, reject)
      } else {
        this.onFullFiledCb.push((value)=> {
          this.parse(p, fullFied(value), resolve,reject)
        })
        this.onRejectedCb.push((error) => {
          this.parse(p, rejected(error), resolve,reject)
        })
      }
    })

    return p
  }

  parse(p, result,resolve,reject) {
    try {
      if(p === result) {
        throw new Error('promise 不可以循环引用')
      }

      if(result instanceof MP) {
        result.then(resolve, reject)
      }

      resolve(result)
      
    } catch (error) {
      reject(error)
    }
  }

 static all(pArray) {
    return new MP((resolve,reject) => {
       let result = []
       pArray.forEach(p => {
          p.then(res=>{
           result.push(res)
           if(pArray.length === result.length) {
             resolve(result)
           }
         }, err => {
           reject(err)
         })
       })
    })
  }


  static race(pArray) {
    return new MP((resolve,reject)=> {
      pArray.forEach(p => {
        p.then(res => {
          resolve(res)
        }, err => {
          reject(err)
        })
      })
    })
  }

 
}


function myNew(fn,...arg) {
  let obj = {}
  obj.__proto__ = fn.prototype
  let result = fn.call(obj,...arg)
  return typeof result === 'object' ? result : obj
}

// 柯里化   将多个参数转化为连续传参的函数

function kelihua(fn) {
  let length = fn.length
  return function  temp() {
    let args = [...arguments]
    if(args.length === length) {
      return fn(...args)
    } else {
      return function () {
         return temp(...args,...arguments)
      }
    }
  }
}