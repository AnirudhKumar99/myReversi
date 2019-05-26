let board;
let currentColor = 'white';
let whiteScore = 0, blackScore = 0;
let floating = false;
function setup() {
    createCanvas(810, 910);
    background(51);
    board = new Reversi();
    board.show();
    // whiteScore=createP('WhiteScore:'+whites);
    // blackScore=createP('BlackScore:'+blacks);
    board.possiblePos();
}
function mousePressed() {
    board.update();
}
function draw() {
    background(200);
    whiteScore = 0;
    blackScore = 0;
    // board.possiblePos();
    board.show();
    for (let coin of board.coins) {
        if (coin.col == 'white') {
            whiteScore++;
        } else {
            blackScore++;
        }
    }
    push();
    fill(255, 0, 0);
    rectMode(CENTER);
    rect(width * 0.75, height - 50, width / 3, 90); fill(0, 0, 255);
    textAlign(CENTER, CENTER);
    textSize(40);
    text(currentColor.toUpperCase() + '\'s TURN', width / 4, height - 50);

    textSize(20);
    text('WHITE: ' + whiteScore, width * 0.74, height - 70);
    text('BLACK: ' + blackScore, width * 0.74, height - 25);
    pop();
}