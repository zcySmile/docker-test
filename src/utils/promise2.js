/*
 * @Author: zcySmile
 * @Date: 2020-12-27 07:09:25
 * @LastEditors: zcySmile
 * @LastEditTime: 2020-12-27 09:00:18
 * @Description:
 */
class HD {
    static PENDING = 'pending'
    static FULLFILED = 'fullfiled'
    static REJECT = 'REJECT'

    constructor(executor) {
        this.status = HD.PENDING
        this.reason = null
        this.value = null
        this.callBacks = []

        executor(this.resolve.bind(this), this.reject.bind(this))
    }

    resolve(value) {
        if (this.status === HD.PENDING) {
            this.status = HD.FULLFILED
            this.value = value
            this.callBacks.map((item) => {
                item.onFullfiled(this.value)
            })
        }
    }

    reject(reason) {
        if (this.status === HD.PENDING) {
            this.status = HD.REJECT
            this.reason = reason
            this.callBacks.map((item) => {
                item.onRejected(this.reason)
            })
        }
    }

    then(onFullfiled, onRejected) {
        let p = new HD((resolve, reject) => {
            if (typeof onFullfiled !== 'function') {
                onFullfiled = (value) => {
                    resolve(value)
                }
            }
            if (typeof onRejected !== 'function') {
                onRejected = (reason) => {
                    onRejected(reason)
                }
            }

            if (this.status === HD.FULLFILED) {
                this.parse(p, onFullfiled(this.value), resolve, reject)
            }
            if (this.status === HD.REJECT) {
                this.parse(p, onRejected(this.reason), resolve, reject)
            }
            if (this.status === HD.PENDING) {
                this.callBacks.push({
                    onFullfiled: (value) => {
                        this.parse(p, onFullfiled(value), resolve, reject)
                    },
                    onRejected: (value) => {
                        this.parse(onRejected(value), resolve, reject)
                    }
                })
            }
        })
        return p
    }

    parse(p, result, resolve, reject) {
        try {
            if (p === result) {
                throw new ErrorType('不能循环应用p')
            }
            if (result instanceof HD) {
                result.then(resolve, reject)
            } else {
                resolve(result)
            }
        } catch (error) {}
    }

    static all(ps) {
        return new HD((resolve, reject) => {
            const resolveList = []
            ps.map((p) => {
                p.then(
                    (res) => {
                        resolveList.push(res)
                        if (ps.length === resolveList.length) {
                            resolve(resolveList)
                        }
                    },
                    (err) => {
                        resolve(err)
                    }
                )
            })
        })
    }

    static race(ps) {
        return new HD((resolve, reject) => {
            ps.map((p) => {
                p.then(
                    (res) => {
                        resolve(res)
                    },
                    (err) => {
                        console.log(err)
                    }
                )
            })
        })
    }
}
