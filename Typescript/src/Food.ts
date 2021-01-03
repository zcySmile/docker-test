/*
 * @Author: zcySmile
 * @Date: 2021-01-02 10:59:23
 * @LastEditors: zcySmile
 * @LastEditTime: 2021-01-02 11:01:36
 * @Description: 
 */

class Food{
    element: HTMLElement;
    constructor() {
        this.element = document.getElementById('food')!
    }
    get X() {
        return this.element.offsetLeft
    }
    get Y() {
        return this.element.offsetTop
    }

    change() {
        const left = Math.round(Math.random() * 29) * 10
        const top = Math.round(Math.random() * 29) * 10
        this.element.style.top = top + 'px'
        this.element.style.left = left + 'px'
    }
}

export default Food