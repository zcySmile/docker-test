
// es6
export function shallowClone(target) {
    if(typeof target === 'object' && target !== null) {
        if(Array.isArray(target)) {
            return [...target]
        } else {
            return {...target}
        }
    }

    return target
}

// es5

export function shallowClone2(target) {

    if(typeof target === 'object' && target !== null) {
        let result = Array.isArray(target) ? [] : {}

        for(let key in target) {
            if(target.hasOwnProperty(key)) {
                result[key] = target[key]
            }
        }
        return result
    }
    
    return target
}


// 深拷贝

// 会丢失方法属性， 无法解决循环引用的问题
export function deepClone1(target) {
    return JSON.parse(JSON.stringify(target))
}


// 无法解决循环引用
export function deepClone2(target) {
    if(typeof target === 'object' && target !== null) {
       let result = Array.isArray(target) ? [] : {}
       for(let key in target) {
           if(target.hasOwnProperty[key]){
              result[key] = deepClone2(target[key])
           }
       }
       return result
    } else {
        return target
    }
}


// 解决循环引用
export function deepClone3(target, map=new Map()) {
    if(typeof target === 'object' && target !== null) {
       let result = Array.isArray(target) ? [] : {}
       if(map.get(target)) {
           return map.get(target)
       }
       map.set(target, result)
       for(let key in target) {
           if(target.hasOwnProperty[key]){
              result[key] = deepClone3(target[key],map)
           }
       }
       return result
    } else {
        return target
    }
}

// 优化for in  (会遍历原型的方法)

export function deepClone4(target, map=new Map()) {
    if(typeof target === 'object' && target !== null) {
       let result = Array.isArray(target) ? [] : {}
       if(map.get(target)) {
           return map.get(target)
       }
       map.set(target, result)
       if(Array.isArray(target)) {
           target.forEach((item,index) => {
               result[index] = deepClone4(item, map)
           })
       } else {
           Object.keys().forEach(key=> {
               result[key] = deepClone4(target[key],map)
           })
       }
       return result
    } else {
        return target
    }
}


