// 工厂模式

// 简单工厂模式， 只创建某一种产品对象的实例，主要用来创建同一类对象， 实例的创建过程封装在内部，只需要传入特定的参数，就可以得到一个实例对象
// 只能作用于创建对象数量比较少，对象的创建逻辑不复杂时使用
class User{
    constructor(opt) {
        this.name = opt.name
        this.pages = opt.pages
    }

    static getInstance(type) {
        switch(type) {
            case 'superAdmin':
                return new User({name:'超级管理员',pages:['首页','权限分类']})
                break;
            case 'admin':
                return new User({name:'管理员',pages:[]})
                break;
            case 'user':
                return new User({name:'普通用户', pages: []})
                break;
            default:
                throw Error('参数错误')
        }
    }
}

const superAdmin = User.getInstance('superAdmin')

// 工厂方法模式， 

class User1{
    constructor(name='',pages=[]){
        if(new.target === User1){
            throw new Error('抽象类不能实例化')
        }
        this.name = name
        this.pages = pages
    }
}

class FactoryUser extends User1{
    constructor(name,pages){
        super(name, pages)
    }
    create(type) {
        switch(type) {
            case 'superAdmin':
                return new FactoryUser({name:'超级管理员',pages:['首页','权限分类']})
                break;
            case 'admin':
                return new FactoryUser({name:'管理员',pages:[]})
                break;
            case 'user':
                return new FactoryUser({name:'普通用户', pages: []})
                break;
            default:
                throw Error('参数错误')
        }
    }
}

const factoryUser = new FactoryUser()