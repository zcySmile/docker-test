//  单例模式

// 简单版单例模式
// 只能通过特定的方法获取实例，不能使用常用的new 关键字去生成实例
// 管理单例的操作，和对象创建的操作，功能代码耦合在一起，不符合'单一职责原则'

function SingleInstance(name) {
    this.name = name
    this.instance = null
}

SingleInstance.getInstance = function (name) {
    if(this.instance) return this.instance
    this.instance = new SingleInstance(name)
    return this.instance
}


// SingleInstance.getInstance('winnner')


//  透明单例模式， 解决通过new关键字创建实例的问题
//  实现原理，闭包。 代码加载时就通过立即执行函数生成一个闭包，闭包中存放instance

let CreateSingleton = (
    function() {
        let instance
        return function(name) {
            if(instance) return instance

            this.name = name
            return instance = this
        }
    }
)()

CreateSingleton.prototype.getName = function() {
    return this.name
}


// 代理版单例模式， 将管理单例模式，和对象创建操作进行拆分，实现更小粒度的划分，符合单一职责原则
let ProxyCreateSingleton = (function() {
    let instance
    return function(name) {
        if(instance) return instance

        return instance = new Singleton(name)
    }
})()

function Singleton(name) {
    this.name = name
}

Singleton.prototype.getName= function() { // 不可以使用箭头函数
    return this.name
}

let winner = new ProxyCreateSingleton('winner')
let loser = new ProxyCreateSingleton('loser')
// console.log(winner) // Singleton{name:winner}
// console.log(winner.getName()) // winner
// console.log(loser.getName())// winner


// 惰性单例模式，  需要时才创建类实例

function AlertClass(message) {
    this.message = message
}
AlertClass.prototype.seMessage= function(message) {
    this.message = message
}

function MaskClass(name) {
    this.name = name
}
MaskClass.prototype.getName = function () {
    console.log(this.name)
}
let proxyCreateAlterInstance = (function () {
    let instance
    return function (message) {
        if(instance) return instance
        instance = new AlertClass(message)
        return instance
    }
})




// 单例模式使用场景
// 引用第三方库，多次引用只会使用一个库的引用
// 弹窗， 购物车，全局太管理store(vuex,redux)


// ES6 创建单例模式

class AlertSigleton{
    static instance 
    constructor(name) {
        if(AlertSigleton.instance) return AlertSigleton.instance
        this.name = name
        AlertSigleton.instance = this
    }
    getName() {
        console.log(this.name)
    }
}

// let alert1 = new AlertSigleton('alert1')
// let alert2=new AlertSigleton('alert2')
// console.log(alert1 === alert2)

//  使用静态方法优化方法
class AlertSingleton2{
    static instance
    constructor(name) {
        this.name = name
    }
    static getInstance(name) {
        if(this.instance ) return this.instance
        return this.instance = new AlertSingleton2(name)
    }
}
let alert1 = AlertSingleton2.getIn('alert1')
let alert2=AlertSingleton2.getIn('alert2')
console.log(alert1 === alert2)
