class Coin {
    constructor(x, y, r, coinColor,col) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.coinColor = coinColor;
        this.col=col;
    }
    show() {
        push();
        fill(this.coinColor);
        noStroke();
        ellipseMode(CENTER);
        ellipse(this.x, this.y, this.r, this.r);
        pop();
    }
}