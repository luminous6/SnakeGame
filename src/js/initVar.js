// 游戏常量设置

// 游戏场景位置，广场的位置
let BASE_X_POINT = 200;
let BASE_Y_POINT = 50;

// 方块宽度
let SQUAERWIDTH = 20;

// 宽度系数 高度系数
let XLEN = 30;
let YLEN = 30;

// 蛇移动事件间隔
let INTERVAL = 100;


// 定义基类 父类

function Square(x, y, width, height, dom) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.viewContent = dom || document.createElement("div")
}

Square.prototype.touch = function() {

}
Square.prototype.update = function(x, y) {
    this.x = x;
    this.y = y;
    this.viewContent.style.left = this.x * SQUAERWIDTH + 'px';
    this.viewContent.style.top = this.y * SQUAERWIDTH + 'px';
}

// 定义子类

let SnakeHead = tool.single(Square);
let SnakeBody = tool.extends(Square);
let Snake = tool.single(Square);
let Floor = tool.extends(Square);
let Stone = tool.extends(Square);
let Food = tool.single(Square);
let Ground = tool.single(Square);


let Game = tool.single();


let TOUCHMENU = {
    MOVE: "move",
    EAT: "eat",
    DIE: "die"
}