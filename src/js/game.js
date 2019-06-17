let game = new Game();

game.score = 0;
game.speed = INTERVAL;
game.timer = null;

game.init = function() {
    ground.init();
    snake.init();
    createFood(ground)
    document.onkeydown = function(e) {
        if (e.which == 37 && snake.direction != DIRECTIONMENU.Right) {
            snake.direction = DIRECTIONMENU.Left
        } else if (e.which == 38 && snake.direction != DIRECTIONMENU.Down) {
            snake.direction = DIRECTIONMENU.Up
        } else if (e.which == 39 && snake.direction != DIRECTIONMENU.Left) {
            snake.direction = DIRECTIONMENU.Right
        } else if (e.which == 40 && snake.direction != DIRECTIONMENU.Up) {
            snake.direction = DIRECTIONMENU.Down
        }
    }
}


game.start = function() {
    clearInterval(this.timer)
    this.timer = setInterval(function() {
        snake.move(ground)
    }, game.speed)
}

game.over = function() {
    clearInterval(this.timer);
    alert(this.score)
}

function createFood(ground) {
    let x = null;
    let y = null;
    let flag = true;
    while (flag) {
        x = 1 + Math.floor(Math.random() * 28);
        y = 1 + Math.floor(Math.random() * 28);
        let isOk = true;
        for (let i = snake.head; i; i = i.next) {
            if (x == i.x && y == i.y) {
                isOk = false;
                break
            }
        }
        if (isOk) {
            flag = false;
        }
    }

    let food = SquareFactory.create('Food', x, y, "green")
    ground.remove(food.x, food.y);
    ground.append(food)
}


game.init()
game.start()