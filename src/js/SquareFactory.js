function SquareFactory() {

}

SquareFactory.create = function(type, x, y, color) {
    if (typeof SquareFactory.prototype[type] == undefined) {
        throw 'no this type';
    }
    if (SquareFactory.prototype[type].prototype.__proto__ != SquareFactory.prototype) {
        SquareFactory.prototype[type].prototype = new SquareFactory();
    }
    let newSquare = SquareFactory.prototype[type](x, y, color);
    return newSquare;
}

SquareFactory.prototype.init = function(square, color, strategyMsg) {
    square.viewContent.style.position = 'absolute';
    square.viewContent.style.left = square.x * SQUAERWIDTH + 'px';
    square.viewContent.style.top = square.y * SQUAERWIDTH + 'px';
    square.viewContent.style.width = square.width + 'px';
    square.viewContent.style.height = square.height + 'px';
    square.viewContent.style.backgroundColor = color;
    square.touch = function() {
        return strategyMsg
    }
}

//子类工厂
SquareFactory.prototype.Floor = function(x, y, color) {
    let obj = new Floor(x, y, SQUAERWIDTH, SQUAERWIDTH);
    this.init(obj, color, TOUCHMENU.MOVE);
    return obj;
}

SquareFactory.prototype.Stone = function(x, y, color) {
    let obj = new Stone(x, y, SQUAERWIDTH, SQUAERWIDTH);
    this.init(obj, color, TOUCHMENU.DIE)
    return obj;
}

SquareFactory.prototype.Food = function(x, y, color) {
    let obj = new Food(x, y, SQUAERWIDTH, SQUAERWIDTH);
    this.init(obj, color, TOUCHMENU.EAT)
    obj.update(x, y);
    return obj;
}

SquareFactory.prototype.SnakeHead = function(x, y, color) {
    let obj = new SnakeHead(x, y, SQUAERWIDTH, SQUAERWIDTH);
    this.init(obj, color, TOUCHMENU.DIE);
    obj.update(x, y);
    return obj;
}

SquareFactory.prototype.SnakeBody = function(x, y, color) {
    let obj = new SnakeBody(x, y, SQUAERWIDTH, SQUAERWIDTH);
    this.init(obj, color, TOUCHMENU.DIE)
    return obj;
}