function getIndex(arr, elt) {
    for (let a in arr) {
        if (arr[a][0] == elt[0] && arr[a][1] == elt[1]) {
            return a;
        }
    }
}
class Reversi {
    // Constructor function for the board
    constructor() {
        //Array to store the alive coins' positions
        this.positions = [];
        this.status = [];
        this.changeColors = [];
        this.whites = 0;
        this.blacks = 0;
        //Creating the array to store the coins
        this.coins = [];
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                this.positions.push([j, i]);
                this.status.push(0);
            }
        }
        this.emptyPositions = [];
        // STARTING CASES
        this.coins.push(new Coin(355, 355, 90, color(0), 'black'));
        this.coins.push(new Coin(355, 455, 90, color(255), 'white'));
        this.coins.push(new Coin(455, 355, 90, color(255), 'white'));
        this.coins.push(new Coin(455, 455, 90, color(0), 'black'));

        // TEST CASES
        // this.coins.push(new Coin(355, 255, 90, color(0), 'black'));
        // this.coins.push(new Coin(455, 555, 90, color(255), 'white'));
    }
    coinAt(x, y) {
        // Return the coin present at the given x and y else return undefined 
        for (let coin of this.coins) {
            if (int(coin.x / 100) == x &&
                int(coin.y / 100) == y) {
                return coin;
            }
        }
        return null;
    }
    remDupes(Arr) {
        for (let f = Arr.length - 1; f >= 0; f--) {
            for (let g = Arr.length - 1; g >= 0; g--) {
                // console.log(f,g)
                if (Arr[g][0] == Arr[f][0] &&
                    Arr[g][1] == Arr[f][1] &&
                    f !== g) {
                    Arr.splice(g, 1);
                }
            }
        }
        return Arr;
    }
    remObjDupes() {
        for (let change of this.changeColors) {
            let keys = Object.keys(change);
            console.log(keys);
        }
    }
    possiblePos() {
        // Calculates all the empty positions where next coin can be placed
        // console.log('Here');
        this.emptyPositions = [];
        // this.changeColors=[];
        // this.coins = [this.coinAt(3, 4), this.coinAt(3, 3), this.coinAt(3, 2)];
        for (let coin of this.coins) { // Loop through all the coins in the present state
            if (currentColor === coin.col) { // Check if the color matches with the current color
                // console.log("\n")
                // console.log('currentColor:',currentColor);
                // let px = int(coin.x / 100);// Extract the x position of the coin
                // let py = int(coin.y / 100);// Extract the y position of the coin
                // console.log("coin:", px, py);
                // Checking all the neighbouring positions of the coin
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        let px = int(coin.x / 100);// Extract the x position of the coin
                        let py = int(coin.y / 100);// Extract the y position of the coin
                        let src = [px, py];
                        // console.log(i, j);
                        // console.log(this.coinAt(px + i, py + j));
                        let count = 1;
                        let pcol = coin.col;
                        let npcol = (pcol == 'white') ? 'black' : 'white';
                        if (this.coinAt(px + i, py + j) !== null &&
                            this.coinAt(px + i, py + j).col !== coin.col) {
                            while (pcol !== npcol) {
                                // console.log('while');
                                // console.log(this.coinAt(px,py));
                                px += (i) * count;
                                py += (j) * count;
                                // console.log(px, py);
                                let p = this.coinAt(px, py);
                                // console.log(p);
                                // console.log('PX,PY', px, py);
                                if (p !== null) {
                                    npcol = p.col;
                                    // console.log('p.col', p.col);
                                } else {
                                    // console.log('found empty');
                                    let wp = this.coinAt(px, py);
                                    if (wp !== null &&
                                        wp.col !== coin.col) {
                                        // console.log('whitePiece:', px, py);
                                    }
                                    else {
                                        // console.log('empty: ', px, py);
                                        this.emptyPositions.push([px, py]);
                                        // this.changeColors.push({ des: [px, py], src: src });
                                        break;
                                    }
                                }
                                // py+=j*count
                            }
                        }

                    }
                }
            }
        }
    }
    isPoss(x, y) {
        for (let pos of this.emptyPositions) {
            if (x == pos[0] && y == pos[1]) {
                return true;
            }
        }
        return false;
    }
    colorChange(moux, mouy) {
        console.log(moux, mouy);
        let swicolor = (currentColor == 'white') ? 'black' : 'white';
        let swi = (currentColor == 'white') ? color(0) : color(255);
        console.log(swi,swicolor);
        let placed = this.coinAt(moux, mouy);
        for (let coin of this.coins) {
            if (coin.col === placed.col && coin !== placed) {
                // console.log(coin.x,coin.y);
                let srcx = moux;
                let srcy = mouy;

                let desx = int(coin.x / 100);
                let desy = int(coin.y / 100);
                console.log(srcx, srcy, '\n', desx, desy);
                if (srcx > desx) {
                    let temp = srcx;
                    srcx = desx;
                    desx = temp;
                    console.log('srcx>desx')
                }
                if (srcy > desy) {
                    let temp = srcy;
                    srcy = desy;
                    desy = temp;
                    console.log('srcy>desy')
                }
                if (srcx == desx) {
                    console.log('srcx=desx')
                    for (let i = srcy + 1; i < desy; i++) {
                        console.log(i);
                        this.coinAt(srcx, i).coinColor = swi;
                        this.coinAt(srcx, i).col = swicolor;
                    }
                } else if (srcy == desy) {
                    console.log('srcy=desy')
                    for (let i = srcx + 1; i < desx; i++) {
                        console.log(i);
                        this.coinAt(i, srcy).coinColor = swi;
                        this.coinAt(i, srcy).col = swicolor;
                    }
                } else {
                    console.log('none in common')
                    for (let i = srcx+1,j = srcy+1; ((i < desx)&&(j < desy)); i++,j++) {
                        // for (let j = srcy+1; j < desy; j++) {
                            console.log(i, j);
                            this.coinAt(i, j).coinColor = swi;
                            this.coinAt(i, j).col = swicolor;
                        // }
                    }
                }
                // console.log(srcx,srcy,'\n',desx,desy);
                // if(srcx==desx){
                //     for(let i=src)
                // }

            }
        }
    }
    update() {
        let moux = int(mouseX / 100);
        let mouy = int(mouseY / 100);

        // console.log(this.isPoss(moux, mouy));
        if (this.isPoss(moux, mouy)) {
            // console.log('mouse cood ', moux, mouy);
            let col = (currentColor == 'white') ? color(255) : color(0);
            // console.log(this.coinAt(moux, mouy))
            if (this.coinAt(moux, mouy) === null) {
                // console.log('mouse cood ', moux, mouy);
                this.status = [];
                for (let i = 0; i < 64; i++) {
                    this.status.push(0)
                }
                let index = getIndex(this.positions, [moux, mouy]);
                this.status[int(index)] = 1;
                let co = new Coin(int((moux + 0.55) * 100), int((mouy + 0.55) * 100), 90, col, currentColor);

                this.coins.push(co);
                // console.log(this.coins.length);

            }
            currentColor = (currentColor == 'white') ? 'black' : 'white';
            this.possiblePos();
            // if (this.emptyPositions.length == 0) {
            //     currentColor = (currentColor == 'white') ? 'white' : 'black';
            // }
        }
        // this.remObjDupes();
        this.colorChange(moux, mouy);


        this.possiblePos();
    }
    show() {
        let Gameover = false;
        let count = 0;
        for (let pos of this.positions) {
            if (this.coinAt(pos[0], pos[1]) !== null) {
                count++;
            } else {
                count = count + 0
            }
        }
        if (count == 63) {
            background(51, 55);
            noLoop();
            push();
            textAlign(CENTER, CENTER);
            textSize(100);
            // text('WHITE: ' + whiteScore, width * 0.5, height / 2 + 25);
            // text('BLACK: ' + blackScore, width * 0.5, height / 2 - 25);
            if (int(whiteScore) > int(blackScore)) {
                text('WHITE WINS', width / 2, height / 2 - 50);
            } else if (int(blackScore) > int(whiteScore)) {
                text('BLACK WINS', width / 2, height / 2 - 50);
            } else {
                text('DRAW', width / 2, height / 2 - 50)
            }
            pop();
        }
        let positions = this.positions;
        for (let pos in positions) {
            rectMode(CENTER);
            if (this.isPoss(positions[pos][0], positions[pos][1]))
                fill(255, 0, 0, 100);
            else if (this.status[pos])
                fill(30, 100, 30);
            else
                fill(30, 255, 30);

            strokeWeight(3);
            rect((positions[pos][0] + 0.55) * 100, (positions[pos][1] + 0.55) * 100, 100, 100, 5);
            // fill(0, 0, 255);
            // textAlign(CENTER, CENTER);
            // textSize(20);
            // text(str(pos[0]) + str(pos[1]), (pos[0] + 0.55) * 100, (pos[1] + 0.55) * 100);
        }
        // console.log(this.coins.length);
        for (let coin of this.coins) {
            coin.show();
        }
    }
}














// IMPORTANT LOGIC CODE
// let count = 1;

// while (pcol !== npcol) {
//     console.log('while');
//     // console.log(this.coinAt(px,py));
//     // console.log(px,py);
//     py += (-1) * count;
//     px += (0) * count;
//     let p = this.coinAt(px, py);
//     // console.log(p);
//     console.log(px, py);
//     if (p !== null) {
//         npcol = p.col;
//         console.log('p.col', p.col);
//     }
//     else {
//         break;
//     }
//     // py+=j*count
// }



