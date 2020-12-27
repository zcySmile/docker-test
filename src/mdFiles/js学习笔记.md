##### 1.模块化

+ <script type='module'></script> 这样才可以在其中使用import 关键字。并且其中的Js语法是严格模式下的而且其中的代码独立作用域。代码是后解析的，相当于在script中添加了defer属性。 

```javascript
if(ture) {
    import('./moudle.js').then(module=>{})
}
```

##### 2.Set 和 WeakSet

WeakSet 里面放的引用类型的数据。而且放置的引用类型的引用数不会加一