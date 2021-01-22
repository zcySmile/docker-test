/*
 * @Author: zcySmile
 * @Date: 2021-01-02 14:33:05
 * @LastEditors: zcySmile
 * @LastEditTime: 2021-01-03 20:46:41
 * @Description: 
 */
// import { init } from 'snabbdom/init'
// import { classModule } from 'snabbdom/modules/class'
// import { propsModule } from 'snabbdom/modules/props'
// import { styleModule } from 'snabbdom/modules/style'
// import { eventListenersModule } from 'snabbdom/modules/eventlisteners'
import h from './snabbdom/h' // helper function for creating vnodes
// import vnode from './snabbdom/vnode'

// var patch = init([ // Init patch function with chosen modules
//   classModule, // makes it easy to toggle classes
//   propsModule, // for setting properties on DOM elements
//   styleModule, // handles styling on elements with support for animations
//   eventListenersModule, // attaches event listeners
// ])

import patch from './snabbdom/patch.js'

var container = document.getElementById('container')

// var vNode1 = h('div', { class: { box: true }, props: { style: "background-color: black", id: 'box' } }, '这是一个盒子')
// var vNode2 = h('div', [
//     h('ul', [
//         h('li', { class: { list:true } }, '苹果'),
//         h('li', h('span', '这是一个span')),
//         h('li','栗子')
//     ])
// ])

// patch(container, vNode2)

const vnode1 = h('ul', {}, [
    h('li', {}, '梨子'),
    h('li', {}, '苹果'),
    h('li', {}, '香蕉'),
    h('li', {}, [
        h('span', {}, '测试1'), 
        h('span',{},h('div',{},'测试2'))
    ])
])


const vnode2 = h('section',{}, '你好')
const vnode3 = h('section', {}, [
    h('p', {}, 'wohao '),
    h('p',{}, '大家好')
])

const vnode4 = h('ul', {}, [
    h('li',{}, 'A'),
    h('li', {},'B'),
    h('li',{},'C')
])
const vnode5 = h('ul', {}, [
    h('li', {}, 'A'),
    h('li',{},"C")
])
patch(container,vnode4)
// console.log(vnode1)
const button = document.getElementById('button')
button.addEventListener('click', () => {
    patch(vnode4, vnode5)
})