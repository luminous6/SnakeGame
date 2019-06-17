let tool = {
    /*
     * 原型继承
     * target 需要继承的目标对象
     * origin 源对象
     */
    inherit: function(target, origin) {
        let temp = function() {};
        temp.prototype = origin.prototype;
        target.prototype = temp.prototype;
        target.constructor = target
    },
    /*
     * 原型私有属性继承，返回一个子类
     * origin 源对象
     */
    extends: function(origin) {
        let result = function() {
            origin.apply(this, arguments)
        }
        this.inherit(result, origin)
        return result
    },
    /*
     * 单例模式
     * origin 源对象
     */
    single: function(origin) {
        let singleResult = (function() {
            let instance;
            return function() {
                if (instance == 'object') return instance;
                instance = this;
                origin && origin.apply(this, arguments)
                return instance;
            }
        })()
        origin && this.inherit(singleResult, origin)
        return singleResult;
    }
}