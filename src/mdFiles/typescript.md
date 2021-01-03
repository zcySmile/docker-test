## tsconfig.json

> **   任意目录
>
> \*    任意文件

```json
{
    "incluede": ["./src/**/*"]，
    "compilerOptions":{
    	// 指定被编译的js版本
    	"target": "ES3",
    	// 指定的模块化规范es2015,es6 commonjs,umd,system,es2020,esnext
    	"module": "es6",
    	// 用用来指定项目中的用到的库,一般不用改
    	"lib":[],
		// 编译文件输出目录
		"outDir": "./dist",
		// 将代码合并成一个文件，但是只在system，AMD模式下有用
		"outFile": "./dist/app.js",
		// 是否对js文件编译，默认false
		"allowJs": true,
		// 是否检查js语法符合规范，默认false
		"checkJs": true,
		// 是否移除注释
		"removeCommonts": true,
		// 不生成编译后的文件，默认false
		"noEmit": false
		// 有错误的时候不生成编译后的文件，默认false
		"noEmitOnError": true,
		// 以下是代码检查的选项
		// 是否开启strict模式，编译后的文件是strict模式
		"alwaysStrict": true
		// 检查隐式的any 类型
		"noImplicitAny": true,
		// 不允许不明确的this
		"noImplicitThis": true,
		// 严格的检查空值
		"strictNullChecks": true,
		// 
     }
}
```

``` javascript
const box = document.getElementById('id')
box?.addEventListener(type,fn)
```

> 接口可以在定义类的时候限制类的结构。接口中所有的属性都不能有实际的值，接口中定义对象的结构，而不考虑实际值。在接口中定义的方法都是抽象方法。定义类时可以实现一个接口。 接口就是规范

``` javascript
class Person implements IPerson{}
```

> 类的实例属性的值可以被任意修改，不安全。

``` javascript
class Person{
    // publice 可以在外边访问
    // private 只能在类的的内部访问，通过在类中添加方法访问
    // protected 在当前类和子类中访问和修改 
    private _name : string
    private _age: number
    constructor(name:string,age:number){
        this._name = name
        this._age = age
    }
    getName() {
        return this._name
    }
    setName(val:string) {
        this._name = val
    }

   // TS 中的get ,set. 可以直接通过实例属性访问，person.name   person.name = 'lili'
   get name() {return this._name}
   set name(val：string){this._name = val}
}
```

## 泛型

> 定义函数和类的时候，用于类型不明确的时候. 定义<T>

``` Javascript
function fn<T>(a: T) :T{
    return a
}
// 不指定，自己推断
fn(10)
// 指定泛型类型
fn<string>('lili')
```

> 指定多个泛型

``` javascript
function fn<T,K>(a:T, b:T):T {
    console.log(b)
    return T
}
fn<string,number>('lili', 10)
```

> 实现了某个接口的泛型

``` javascript
interface Inter{
    length: number
}
function fn<T extends Inter>(a:T) :number{
    return a.length
}
fn('123')  //字符串有length属性
```

> 类中定义泛型

``` javascript
class Person<T>{
    private name : T
    constructor(name:T) {
        this.name = name
    }
}

new Person<string>('lili')
```

##  Virtual Dom

> 模板编译将真实的dom节点树转化为一个用js对象描述的层次结构，这个js对象就是虚拟dom。然后通过h函数将虚拟dom转化为虚拟节点
>
> diff 是发生在虚拟dom上的

> 虚拟节点的属性

``` Javascript
{
    elm:undifined, // 这个虚拟节点对应的真是的dom
    sel: 'div',
    data:{},
    key: undefined,
    children: undefined,
    text: '只是一个盒子'
}
var vNode1 = h('div', { class: { box: true }, props: { style: "background-color: black", id: 'box' } }, '这是一个盒子')
var vNode2 = h('div', [
    h('ul', [
        h('li', { class: { list:true } }, '苹果'),
        h('li', h('span', '这是一个span')),
        h('li','栗子')
    ])
])
```

> 通过key告诉diff算法，他们两个是同一个节点。
>
> 只有同一个节点，才会进行精细的比较，否则就删除旧的节点，插入新的节点。 选择器相同，key相同就是同一个节点
>
> 只会进行同一级比较，不会跨级比较 

>patch函数的作用： 将新旧虚拟节点进行比较，更新差异，在更新差异的过程中会生成真是的dom节点，最后将dom节点插入到页面的中
>
>patch 函数流程： 首先判断oldVnode是一个dom节点还是一个vnode,如果是dom节点，就将dom节点转化为vnode,  然后判断oldvnode 和 newVnode 是不是同一个虚拟节点， 如果是同一个虚拟节点，就进行精细的比较，如果不是同一，就将旧的节点删除，插入新的节点