var $ = function(element) {
    if (!(this instanceof $)) {
        return new $(element)
    }

    if (element instanceof $) {
        return element
    }

    if (typeof element === 'string') {
        element = document.querySelectorAll(element)
    } else {
        element = [element]
    }

    for (var i = 0; i < element.length; i ++) {
        this[i] = element[i]
    }

    this.element = element
    this.store = {}
}

$.prototype = {
    on: function(type, fn) {
        if (typeof type !== 'array') {
            type = [type]
        }

        for (var i = 0; i < type.length; i ++) {
            for (var j = 0; j < this.element.length; j ++) {
                this.element[j].addEventListener(type[i], fn, false)
            }
        }
    },
    off: function(type, fn) {
        if (typeof type !== 'array') {
            type = [type]
        }

        for (var i = 0; i < type.length; i ++) {
            for (var j = 0; j < this.element.length; j ++) {
                this.element[j].removeEventListener(type[i], fn, false)
            }
        }
    },
    offset: function() {
        var bound = this.element[0].getBoundingClientRect()
        return {
            left: bound.left,
            top: bound.top
        }
    },
    outerWidth: function() {
        return this.element[0].offsetWidth
    },
    outerHeight: function() {
        return this.element[0].offsetHeight
    },
    each: function(fn) {
        [].forEach.call(this.element, function(node, index) {
            fn(index, node)
        })
    },
    data: function(key, value) {
        this.element[0].data = this.element[0].data || {}
        if (value === undefined) {
            return this.element[0].data[key]
        }

        this.element[0].data[key] = value
    },
    removeData: function(key) {
        delete this.element[0].data[key]
    },
    addClass: function(cls) {
        this.element[0].classList.add(cls)
    },
    removeClass: function(cls) {
        this.element[0].classList.remove(cls)
    }
}

function isEmpty(obj) {
    for (var k in obj) {
        return false
    }

    return true
}