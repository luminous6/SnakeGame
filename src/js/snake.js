let snake = new Snake()

snake.head = null;
snake.tail = null;

let DIRECTIONMENU = {
    Right: {
        x: 1,
        y: 0
    },
    Left: {
        x: -1,
        y: 0
    },
    Up: {
        x: 0,
        y: -1
    },
    Down: {
        x: 0,
        y: 1
    }
}

snake.init = function() {

    let oSnakeHead = SquareFactory.create('SnakeHead', 3, 1, 'red');
    let oSnakeBody1 = SquareFactory.create('SnakeBody', 2, 1, 'deeppink');
    let oSnakeBody2 = SquareFactory.create('SnakeBody', 1, 1, 'deeppink');
    snake.head = oSnakeHead;
    snake.tail = oSnakeBody2;

    //链表
    oSnakeHead.last = null;
    oSnakeHead.next = oSnakeBody1;

    oSnakeBody1.last = oSnakeHead;
    oSnakeBody1.next = oSnakeBody2;

    oSnakeBody2.last = oSnakeBody1;
    oSnakeBody2.next = null;

    ground.remove(oSnakeHead.x, oSnakeHead.y);
    ground.append(oSnakeHead);
    ground.remove(oSnakeBody1.x, oSnakeBody1.y);
    ground.append(oSnakeBody1);
    ground.remove(oSnakeBody2.x, oSnakeBody2.y);
    ground.append(oSnakeBody2);

    //初始方向
    this.direction = DIRECTIONMENU.Right;

}

//处理touch后的消息
snake.strategies = {
    move: function(snake, square, ground, fromEat) {
        //处理蛇身
        let newBody = SquareFactory.create('SnakeBody', snake.head.x, snake.head.y, 'deeppink');
        newBody.next = snake.head.next;
        newBody.next.last = newBody;
        newBody.last = null;

        ground.remove(snake.head.x, snake.head.y);
        ground.append(newBody);

        //处理蛇头
        let newHead = SquareFactory.create('SnakeHead', square.x, square.y, 'red');

        newHead.next = newBody;
        newBody.last = newHead;
        newHead.last = null;
        snake.head = newHead;
        ground.remove(square.x, square.y);
        ground.append(newHead);

        if (!fromEat) {
            //处理尾巴
            let newFloor = SquareFactory.create("Floor", snake.tail.x, snake.tail.y, 'orange');
            ground.remove(newFloor.x, newFloor.y);
            ground.append(newFloor);
            snake.tail = snake.tail.last;
        }


    },
    eat: function(snake, square, ground) {
        console.log('吃')
        game.score++;
        this.move(snake, square, ground, true);
        createFood(ground)
    },
    die: function() {
        game.over()
    },
}


snake.move = function(ground) {
    let square = ground.SquareTable[this.head.y + this.direction.y][this.head.x + this.direction.x];
    if (typeof square.touch == 'function') {
        this.strategies[square.touch()](this, square, ground)
    }
}