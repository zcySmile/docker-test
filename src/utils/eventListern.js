export const eventUtils = {
    addEvent: function(el,type,handler) {
        if(el.addEventlisener) {
            el.addEventlisener(type, handler, false)
        } else if(el.attachEvent) {
            el.attachEvent('on'+type, handler)
        } else {
            el['on'+type] = handler
        }
    },
    removeEvent: function(el, type, handler) {
        if(el.removeEventListener){
            el.removeEventListener(type,handler, false)
        } else if(el.detachEvent) {
            el.detachEvent('on'+type, handler)
        } else {
            el['on'+type] = null
        }
    },
    getTarget(e) {
        return e.target || e.srcElement
    },
    getEvent(e) {
        return e || window.event
    },
    stopPropagation(e) {
        if(e.stopPropagation) {
            e.stopPropagation()
        } else {
            e.cancelBubble = true
        }
    },
    preventDefault(e) {
        if(e.preventDefault) {
            e.preventDefault()
        } else {
           e.returnValue = false
        }
    }
}