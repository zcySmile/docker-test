/*
 * @Author: zcySmile
 * @Date: 2020-12-25 04:39:15
 * @LastEditors: zcySmile
 * @LastEditTime: 2020-12-25 05:16:45
 * @Description: 继承
 */

//  组合继承 ， 调用了两次父方法的构造函数，造成子方法原型上保存了一份多余的数据
function Animal(type, name, age) {
    this.name = name
    this.type = type
    this.age = age
}

Animal.prototype.getName = function() {
    return this.name
}

function Dog(name, age) {
    Animal.call(this, 'dog', name, age) // 构造函数继承， 这种继承方法，所有子实例共享原型中的引用类型变量
}
Dog.prototype = new Animal() // 原型链继承， 需要将所有的父组件方法定义在方法内部， 不能实现发放共享

//寄生组合式继承
function object(o) {
    function F() {}
    F.prototype = o
    return new F()
}

function Dog(name, age) {
    Animal.call(this, name, age)
}

Dog.prototype = object(Animal.prototype)
Dog.constructor = Dog

let dog = new Dog('huahua', 12)
console.log(dog.getName())

// es6实现继承
class Animal {
    constructor(type) {
        this.type = type
    }
    getType() {
        return this.type
    }
}

class Dog extends Animal {
    constructor(name, age) {
        super('dog')
        this.name = name
        this.age = age
    }
    getName() {}
    getAge() {}
}
