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
        this.coins.push(new Coin(355, 355, 90, color(255), 'white'));
        this.coins.push(new Coin(355, 455, 90, color(0), 'black'));
        this.coins.push(new Coin(455, 355, 90, color(0), 'black'));
        this.coins.push(new Coin(455, 455, 90, color(255), 'white'));

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
    possiblePos() {
        // Calculates all the empty positions where next coin can be placed
        // console.log('Here');
        this.emptyPositions = [];
        // this.coins = [this.coinAt(3, 4), this.coinAt(3, 3), this.coinAt(3, 2)];
        for (let coin of this.coins) { // Loop through all the coins in the present state
            if (currentColor === coin.col) { // Check if the color matches with the current color
                // console.log("\n")
                // console.log('currentColor:',currentColor);
                let px = int(coin.x / 100);// Extract the x position of the coin
                let py = int(coin.y / 100);// Extract the y position of the coin
                // console.log("coin:", px, py);
                // Checking all the neighbouring positions of the coin
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        let px = int(coin.x / 100);// Extract the x position of the coin
                        let py = int(coin.y / 100);// Extract the y position of the coin
                        // let src = [px, py];
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
        // console.log(this.emptyPositions.length);
        for (let pss = this.emptyPositions.length - 1; pss >= 0; pss--) {
            // console.log(this.emptyPositions[pss]);
            let ps = this.emptyPositions[pss];
            // if (ps !== undefined) {
            if ((ps !== undefined) && (ps[0] < 0 || ps[0] > 7 || ps[1] < 0 || ps[1] > 7)) {
                // console.log('removing :', ps[0], ps[1]);
                this.emptyPositions.splice(pss, 1);
                // }
            }
        }
        this.emptyPositions = this.remDupes(this.emptyPositions);
    }
    isPoss(x, y) {
        for (let pos of this.emptyPositions) {
            if (x == pos[0] && y == pos[1]) {
                return true;
            }
        }
        return false;
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
                // console.log('Placed coin');
                let pmx = moux;
                let pmy = mouy;
                for (let ok = -1; ok <= 1; ok++ , pmx = moux) {
                    // pmx=moux;
                    // pmy=mouy;
                    for (let ko = -1; ko <= 1; ko++ , pmy = mouy) {
                        {
                            // console.log("pmx,pmy"+pmx,pmy);
                            console.log("ok,ko", ok, ko);
                            let ccol = currentColor;
                            let piece = this.coinAt(pmx + ok, pmy + ko);
                            // let piece = this.coinAt(moux, mouy + 1);
                            let ocol;
                            if (piece !== null) ocol = piece.col
                            // let ind = pmy;
                            let ind = 0;
                            // console.log(moux, mouy);
                            // console.log(ccol,ocol);
                            while (1 && (piece !== null)) {
                                ind++;
                                piece = this.coinAt(pmx + (ind * ok), pmy + (ind * ko));
                                console.log(pmx + (ind * ok), pmy + (ind * ko));
                                // console.log(moux, ind, piece.col);
                                if (piece !== null) {
                                    // piece.coinColor = (piece.col == 'white') ? color(0) : color(255);
                                    // piece.col = (piece.col == 'white') ? 'black' : 'white';
                                    ocol = (piece.col == 'white') ? 'black' : 'white';
                                    // console.log(ocol);
                                    if (ocol !== ccol) {
                                        for (let inn = ind - 1; inn > 0; inn--) {
                                            piece = this.coinAt(pmx + (inn * ok), pmy + (inn * ko));
                                            piece.coinColor = (piece.col == 'white') ? color(0) : color(255);
                                            piece.col = (piece.col == 'white') ? 'black' : 'white';

                                        }
                                        // console.log(ind, ocol);
                                        break;
                                    }
                                }
                                else {
                                    break;
                                }
                            }
                        }
                    }
                }
                // let ccol = currentColor;
                // // let piece = this.coinAt(pmx + ok, pmy + ko);
                // let piece = this.coinAt(moux, mouy + 1);
                // let ocol;
                // if (piece !== null) ocol = piece.col
                // let ind = mouy;
                // // console.log(moux, mouy);
                // // console.log(ccol,ocol);
                // while (1 && (piece !== null)) {
                //     ind++;
                //     piece = this.coinAt(moux, ind);
                //     console.log(moux, ind, piece.col);
                //     piece.coinColor = (piece.col == 'white') ? color(0) : color(255);
                //     piece.col = (piece.col == 'white') ? 'black' : 'white';
                //     ocol = (piece.col == 'white') ? 'black' : 'white';
                //     if (ocol !== ccol) {
                //         break;
                //     }
                // }
            }
            currentColor = (currentColor == 'white') ? 'black' : 'white';
            this.possiblePos();
            if (this.emptyPositions.length == 0) {
                currentColor = (currentColor == 'white') ? 'black' : 'white';
                console.log('Entered second loop');
                this.possiblePos();
                if (this.emptyPositions.length == 0) {
                    console.log('Entered third loop');
                    if (blackScore > whiteScore) {
                        console.log('BLACK WINS');
                    }
                    else if (whiteScore > blackScore) {
                        console.log('WHITE WINS');
                    } else {
                        console.log('DRAW');
                    }
                }
            }

        }

    }
    show() {
        // let Gameover = false;
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









