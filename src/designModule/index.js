// 浏览器事件绑定, 外观模式，提供统一接口
function addEvent(el,type,fn,bubble=false) {
    if(el.addEventListener) {
        el.addEventListener(type,fn,bubble)
    } else if(el.attachEvent) {
        el.attachEvent('on'+type, fn)
    } else {
        el['on'+type] = fn
    }
}


// 代理模式

let Flower = function(){}

let A = {
    sendFlower: function(target) {
        let flower = new Flower()
        target.receiveFlower(flower)
    }
}

let B = {
    receiveFlower: function(flower) {
        Girl.listenMood(function () {
            Girl.receiveFlower(flower)
        })
    }
}

let Girl = {
    receiveFlower: function(flower) {
        console.log('shoudaohua')
    },
    listenMood: function(fn) {
        setTimeout(function(){
            fn
        },1000)
    }
}

// 场景事件代理