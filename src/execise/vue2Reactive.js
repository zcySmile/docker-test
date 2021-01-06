//  vue2 响应式原理
const arrayPrototype = Array.prototype
const newPrototype = Object.create(arrayPrototype)

const methods= ['push','pop','shift','unshift','splice','sort','reverse']

methods.forEach(method=> {
    Object.defineProperty(newPrototype,method,{
        writable: true,
        value: function() {
            let result = arrayPrototype[method].call(this,...arguments)
          //  通知依赖更新视图 updataView()
            return result
        }
    })
})

function observe(data) {
    if(typeof data !== 'object' || data === null){
        return data
    }
    if(Array.isArray(data)) {
      data.__proto__ = newPrototype
    } 
     
        for(let key in data) {
            defineReactive(data,key,data[key])
        }
    
}

function defineReactive(data,key,val) {
    observe(val)
    Object.defineProperty(data,key,{
        get() {
            // 在此处收集依赖
            return val
        },
        set(newVal){
            if(val !== newVal) {
                observe(newVal)
                val = newVal
                // 通知依赖更新视图 updataView()
               
            }
        }
    })
}


function updataView() {
    console.log('视图更新了')
}