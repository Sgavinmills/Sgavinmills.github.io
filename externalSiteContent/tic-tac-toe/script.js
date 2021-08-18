const winningGrids = [
    {
        topLeft: 'cross',
        topMiddle: 'cross',
        topRight: 'cross'
    },
    {
        topLeft: 'cross',
        middleMiddle: 'cross',
        bottomRight: 'cross'
    },
    {
        topLeft: 'cross',
        middleLeft: 'cross',
        bottomLeft: 'cross'
    },
    {
        topMiddle: 'cross',
        middleMiddle: 'cross',
        bottomMiddle: 'cross'
    },
    {
        topRight: 'cross',
        middleMiddle: 'cross',
        bottomLeft: 'cross'
    },
    {
        topRight: 'cross',
        middleRight: 'cross',
        bottomRight: 'cross'
    },
    {
        middleLeft: 'cross',
        middleMiddle: 'cross',
        middleRight: 'cross'
    },
    {
        bottomLeft: 'cross',
        bottomMiddle: 'cross',
        bottomRight: 'cross'
    },
    {
        topLeft: 'circle',
        topMiddle: 'circle',
        topRight: 'circle'
    },
    {
        topLeft: 'circle',
        middleMiddle: 'circle',
        bottomRight: 'circle'
    },
    {
        topLeft: 'circle',
        middleLeft: 'circle',
        bottomLeft: 'circle'
    },
    {
        topMiddle: 'circle',
        middleMiddle: 'circle',
        bottomMiddle: 'circle'
    },
    {
        topRight: 'circle',
        middleMiddle: 'circle',
        bottomLeft: 'circle'
    },
    {
        topRight: 'circle',
        middleRight: 'circle',
        bottomRight: 'circle'
    },
    {
        middleLeft: 'circle',
        middleMiddle: 'circle',
        middleRight: 'circle'
    },
    {
        bottomLeft: 'circle',
        bottomMiddle: 'circle',
        bottomRight: 'circle'
    }

];

let winner = false;
let crossesTurn = true;
let player1 = 'cross';
let turn = 0;
const grid = {};

const scores = {
    player1: 0,
    player2: 0
}

const currentGame = {
    cross: 'player1',
    circle: 'player2',
}


//for updating score and shape info on HTML page
const player1Shape = document.getElementById('player1shape');
const player2Shape = document.getElementById('player2shape');
const player1Score = document.getElementById('player1Score');
const player2Score = document.getElementById('player2Score');

const squares = [...document.querySelectorAll('.square')];
const resetBtn = document.getElementById('resetBtn');



//writes current shape to HTML
function updateShapeInfo() {
    if (currentGame.cross === 'player1') {
        player1Shape.innerText = 'crosses';
        player2Shape.innerText = 'circles';

    } else {
        player1Shape.innerText = 'circles';
        player2Shape.innerText = 'crosses';
    }
}

//writes currentscore to HTML
function updateScoreInfo() {
    player1Score.innerText = scores.player1;
    player2Score.innerText = scores.player2;

}
updateShapeInfo();
updateScoreInfo();





resetBtn.addEventListener('click', clearGrid);
squares.forEach(square => {
    square.addEventListener('click', takeTurn);
})


function takeTurn(event) {
    const selectedSquare = event.target;
    if (spaceClear(selectedSquare) && !winner) {
        if (turn < 9) {
            if (crossesTurn) {
                placeCross(selectedSquare)
                crossesTurn = !crossesTurn;
                turn++;
            }
            else {
                placeCircle(selectedSquare);
                crossesTurn = !crossesTurn;
                turn++;
            }
        }
    }

    // if (turn === 9 && !winner) {
    //     alert('it must be a draw')
    // }

}


function clearGrid() {
    squares.forEach(square => {
        square.style['background-color'] = '';
        if (square.childElementCount > 0) {
            let children = square.childElementCount;
            for (let i = 0; i < children; i++) {
                square.removeChild(square.childNodes[0]);
            }
        }
    })

    turn = 0;
    winner = false;
    for (const property in grid) {
        delete grid[property];
    }

    if (player1 === 'cross') {
        player1 = 'circle';
    } else player1 = 'cross';

    //switch p2 and p1
    if (currentGame.cross === 'player1') {
        currentGame.cross = 'player2';
        currentGame.circle= 'player1';
    } else {
        currentGame.circle = 'player2';
        currentGame.cross = 'player1';
    }
    console.log(currentGame);
    updateShapeInfo();

    crossesTurn = true;
}

function checkWinner() {

    for (let i = 0; i < winningGrids.length; i++) {

        keysCurrentGrid = Object.keys(winningGrids[i]);
        let winningGrid = keysCurrentGrid.every(key => {
            if (grid[key] === winningGrids[i][key]) {
                return true;
            } else return false;
        })
        if (winningGrid) {
            winner = true;
            // console.log(winningGrids[i])



            // const winningSquare = document.getElementById(keysCurrentGrid[0]);
            // console.log(winningSquare);
            // winningSquare.style['background-color'] = 'rgba(226, 140, 140, 0.3)'

            let winningType;
            // console.log(keysCurrentGrid[0]);

            winningType = (winningGrids[i][keysCurrentGrid[0]]);
            // console.log(`${player1} vs ${winningType}`)
            // console.log(winningType);
            //currentGame[winningType] <--is equal to Plyer 1 or Plyer 2
            // console.log(currentGame[winningType]);
            scores[currentGame[winningType]]++;
            if (player1 === winningType) {
                // scores.player1++;

            } else {
                // scores.player2++;
            }
            // console.log(scores);
            keysCurrentGrid.forEach((eachGrid) => {

                let winningSquare = document.getElementById(eachGrid);

                winningSquare.style['background-color'] = 'rgba(226, 140, 140, 0.3)'
            })

    updateScoreInfo();

            break;
        }
    }

    return false;

}
function spaceClear(square) {
    if (grid[square.id])
        return false;

    return true;
}

function placeCross(element) {
    let div1 = document.createElement('div');
    let div2 = document.createElement('div');
    div1.setAttribute('class', 'line1');
    div2.setAttribute('class', 'line2');
    element.appendChild(div1);
    element.appendChild(div2);
    grid[element.id] = 'cross';
    checkWinner();


}

function placeCircle(element) {
    let div = document.createElement('div');
    div.setAttribute('class', 'circle');
    element.appendChild(div);
    grid[element.id] = 'circle';
    checkWinner();
}
