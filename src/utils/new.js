export function myNew(constructorFn, ...args) {
    let obj = {}
    obj.__proto__ = constructorFn.prototype
    let result = fn.call(obj,...args)
    return typeof result === 'object' ? result : obj
}