/*
 * @Author: zcySmile
 * @Date: 2020-12-25 05:35:48
 * @LastEditors: zcySmile
 * @LastEditTime: 2020-12-25 05:39:17
 * @Description:
 */
//  es5
function slepp(time) {
    const featurn = new Date().getTime() + parseInt(time, 10)
    while (new Date().getTime() < featurn) {
        continue
    }
}

// es6

function sleep2(delay) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}
