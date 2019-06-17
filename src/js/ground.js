let ground = new Ground(BASE_X_POINT, BASE_Y_POINT, XLEN * SQUAERWIDTH, YLEN * SQUAERWIDTH);
ground.init = function() {

    this.viewContent.style.position = 'absolute';
    this.viewContent.style.left = this.x + 'px';
    this.viewContent.style.top = this.y + 'px';
    this.viewContent.style.width = this.width + 'px';
    this.viewContent.style.height = this.height + 'px';
    this.viewContent.style.backgroundColor = '#0ff';
    document.body.appendChild(this.viewContent)

    this.SquareTable = [

    ]
    for (let i = 0; i < YLEN; i++) {
        this.SquareTable[i] = new Array(XLEN);
        for (let j = 0; j < XLEN; j++) {
            let newSquare = null;
            if (j == 0 || j == XLEN - 1 || i == 0 || i == YLEN - 1) {
                newSquare = SquareFactory.create('Stone', j, i, 'black')
            } else {
                newSquare = SquareFactory.create('Floor', j, i, 'orange')
            }
            this.SquareTable[i][j] = newSquare;
            this.viewContent.appendChild(newSquare.viewContent)

        }
    }

};



ground.remove = function(x, y) {
    this.viewContent.removeChild(this.SquareTable[y][x].viewContent);
    this.SquareTable[y][x] = null
}

ground.append = function(square) {
    this.viewContent.appendChild(square.viewContent);
    this.SquareTable[square.y][square.x] = square
}