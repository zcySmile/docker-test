export function curry(fn) {
    let length = fn.length
    return function temp() {
        let args = [...arguments]
        if(args.length === length) {
            return fn(...args)
        } else {
            return function () {
                return temp(...args, ...arguments)
            }
        }
    }
}