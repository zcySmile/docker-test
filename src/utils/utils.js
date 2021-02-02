function call(fn,obj,...arg) {
    if(obj === undefined || obj === null) {
        obj = globalThis
    }
    obj.temp = fn 
    let result = obj.temp(...arg)
    delete obj.temp
    return result
}


// 事件委托封装函数

function addEventListener(el,type,fn, selector) {
    if(typeof el === 'string') {
        el = document.querySelector(el)
    }

    if(!selector) { // 不是事件委托
        el.addEventListener(type,fn)
    } else { // 是事件委托
        el.addEventListener(type, function(e) {
            let target = e.target
            if(target.maches(selector)) {
                fn.call(target, e)
            }
        })
    }
}

// 事件总线
const eventBus = {
    callbacks: {},
    on: function(type, callback) {
        if(this.callbacks[type]) {
            this.callbacks[type].push(callback)
        } else {
            this.callbacks[type] = [callback]  // 每个时间事件类型是个数组， 可以绑定多个同类型事件
        }
    },
    emit: function(type, data) {
        if(this.callbacks[type] && this.callbacks[type].length > 0) {
            this.callbacks[type].forEach(callback => {callback(data)})
        }
    },
    off:function (type) {
        if(!type) {
            this.callbacks = {}   // 解绑所有事件
        } else {
            // 解绑特定事件
            delete this.callbacks[type]
        }
    }
}


// 订阅发布

const PubSub = {
    id: 1,
    callbacks: {
        // type:{
        //     token1: callback,
        //     token2:callback
        // }
    }
}
PubSub.subscribe = function (type, callback) {
    let callbackId = 'token_'+ id++
    if(this.callback[type]) {
        this.callbacks[type][callbackId] = callback
    } else {
        this.callbacks[type] = {
            [callbackId] :callback
        }
    }

    return callbackId
}

PubSub.publice= function(type, data) {
    if(this.callbacks[type]){
        Object.values(this.callbacks[type]).forEach(callback => callback(data))
    }
}

PubSub.cancel = function (flag) {
// 取消订阅分为三种情况， 没哟传参，全部取消
// 参数为订阅类型， 取消相应的订阅类型的事件
// 参数是id， 取消相应的id事件

    if(!flag) {
        this.callbacks = {}
    } else if(typeof flag === 'string') {
        if(flag.indexOf('token_') === 0) {
            let typeCallbacks = Object.values(this.callbacks).find(typeCallbacks => typeCallbacks.hasOwnProperty(flag))
            if(typeCallbacks) {
                delete typeCallbacks[flag]
            }
        }else {
            if(this.callbacks[flag]) {
                this.callbacks[flag] = {}
            }
        }
    }
} 

// axios  封装
function axios({method, url, params, data}) {
    method = method.toUppercase()
    return new Promise((resolve,reject)=> {
        let xhr = new XMLHttpRequest()

        let str = ''
        for(let k in params) {
            str = `${k}=${params[k]}&`
        }
        str= str.slice(0,-1)

        xhr.open(method, `${url}?${str}`)

        xhr.responseType = 'json'
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4) {
                if(xhr.status >= 200 && xhr.status < 300) {
                    resolve({
                        status:xhr.status,
                        message:xhr.message,
                        body:xhr.response
                    })
                } else {
                    reject(new Error('请求失败'+xhr.status))
                }
            }
        }

       if(['POST','PUT','DELETE'].includes(method)) {
           xhr.setRequestHeader('Content-type','application/json')
           xhr.send(JSON.stringify(data))
       } else {
           xhr.send()
       }
    })
}

axios.get(url, options) {
    return axios(Object.assign(options, {method: 'GET', url}))
}