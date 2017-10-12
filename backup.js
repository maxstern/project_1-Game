// store all squares in an array (0 - 24)
let squares = $('.square');

const allEdges = [0, 1, 2, 3, 4, 9, 14, 19, 24, 23, 22, 21, 20, 15, 10, 5];


// add array index to squares for referencing squares
// ---------------------------------------
// ---------------------------------------
for (i = 0; i < squares.length; i++) {
  $(squares[i]).text(i)
}
// ---------------------------------------
// ---------------------------------------



// detect key press
// always running
// shell code from stackoverflow
// ---------------------------------------
$(document).keydown(function(e) {
  if (gameState === true) {
    switch(e.which) {
        case 37: // left
        keyPress('left');
        break;

        case 38: // up
        keyPress('up');
        break;

        case 39: // right
        keyPress('right');
        break;

        case 40: // down
        keyPress('down');
        break;

        default: return; // exit this handler for other keys
    }
  };
  e.preventDefault(); // prevent the default action (scroll / move caret)
});
// -------------------------------





//////////////////////////
// showStartSquare();   //
// hideStartSquare();   //
//                      //
// showFinishSquare();  //
// hideFinishSquare();  //
//                      //
// showMines();         //
// hideMines();         //
//////////////////////////



let gameState = true;


var currentSquare = setStartSquare();
var finishPoint = setFinishSquare();
var mines = setMines(0);


function resetGame() {

  for (i = 0; i < squares.length; i++) {
  $(squares[i]).css("background", "#C5C6C7")
  };

  currentSquare = setStartSquare();
  showStartSquare();
  finishPoint = setFinishSquare();
  showFinishSquare();
  mines = setMines(6);
  showMines();
  console.log(mines);
}






// SET START SQUARE
// ---------------------------------------
// generate random whole number bewteen 0 and 24
function setStartSquare() {
  let randomSquare = (Math.random() * 16);
  randomSquare = Math.floor(randomSquare);
  // set initial random square
  let currentSquare = allEdges[randomSquare];
  // canSquareMove();
  return currentSquare;
};
// ---------------------------------------

// SET FINISH SQUARE
// ---------------------------------------
// generate random whole number bewteen 0 and 24
// makes sure it isn't the same as the start square
function setFinishSquare() {
  while (true) {
    let finishPoint = (Math.random() * 16);
    finishPoint = Math.floor(finishPoint);
    finishPoint = allEdges[finishPoint];

    if (finishPoint !== currentSquare) {
      return finishPoint;
      break;
    };
  };
};
// ---------------------------------------

// MAKE MINES
// ---------------------------------------
// generate random whole number bewteen 0 and 24
// makes sure it isn't the same as the start or finish square
function setMines(numMines) {
 let mines = []
  for (i = 0; i < numMines; i++) {
    let mineToAdd = 0
    while (true) {
      mineToAdd = (Math.random() * 24);
      mineToAdd = Math.floor(mineToAdd);

      if (mineToAdd !== currentSquare && mineToAdd !== finishPoint && mines.includes(mineToAdd) === false) {
        mines.push(mineToAdd);
        break;
      };
    };
  };
  return mines;
};





// Is square is on the edge of the board
// ---------------------------------------
const topSquares = [0, 1, 2, 3, 4];
const bottomSquares = [20, 21, 22, 23, 24];
const leftSquares = [0, 5, 10, 15, 20];
const rightSquares = [4, 9, 14, 19, 24];

function canSquareMove() {
  if (currentSquare === 0) {
    return("topLeft")
  } else if (currentSquare === 4) {
    return("topRight")
  } else if (currentSquare === 20) {
    return("bottomLeft")
  } else if (currentSquare === 24) {
    return("bottomRight")
  } else if (topSquares.includes(currentSquare)) {
    return("top")
  } else if (bottomSquares.includes(currentSquare)) {
    return("bottom")
  } else if (leftSquares.includes(currentSquare)) {
    return("left")
  } else if (rightSquares.includes(currentSquare)) {
    return("right")
  } else {
    return("yes")
  }
};
// ---------------------------------------



// Game mechanics (moving square around)
// ---------------------------------------
function keyPress(key) {

  switch(key) {

    case 'left':
      if (canSquareMove() === "left" || canSquareMove() === "topLeft" || canSquareMove() === "bottomLeft") {
        break;
      }
      resetOldSquare();
      currentSquare -= 1;
      squareBackground();
      break;

    case 'right':
      if (canSquareMove() === "right" || canSquareMove() === "topRight" || canSquareMove() === "bottomRight") {
        break;
      }
      resetOldSquare();
      currentSquare += 1;
      squareBackground();
      break;

    case 'up':
      if (canSquareMove() === "top"  || canSquareMove() === "topLeft" || canSquareMove() === "topRight") {
        break;
      }
      resetOldSquare();
      currentSquare -= 5;
      squareBackground();
      break;

    case 'down':
      if (canSquareMove() === "bottom" || canSquareMove() === "bottomLeft" || canSquareMove() === "bottomRight") {
        break;
      }
      resetOldSquare();
      currentSquare += 5;
      squareBackground();
      break;
  };
  checkWin();
  checkLoss();
};
// ---------------------------------------











// ---------------------------------------
// ---------------------------------------
// SET UP FUNCTIONS
// ---------------------------------------
// ---------------------------------------


// show START point
// ---------------------------------------
function showStartSquare() {
  $(squares[currentSquare]).css("background-color", "#66FCF1")
}
// ---------------------------------------

// hide START point
// ---------------------------------------
function hideStartSquare() {
  $(squares[currentSquare]).css("background-color", "pink")
}
// ---------------------------------------


// show finish point
// ---------------------------------------
function showFinishSquare() {
  $(squares[finishPoint]).css("background-color", "red")
}
// ---------------------------------------

// hide finish point
// ---------------------------------------
function hideFinishSquare() {
  $(squares[finishPoint]).css("background-color", "pink")
}
// ---------------------------------------


// Show mines
function showMines() {
  for (i = 0; i < mines.length; i++) {
    $(squares[mines[i]]).css("background-color", "black");
  };
};
// ---------------------------------------

// Hide mines
function hideMines() {
  for (i = 0; i < mines.length; i++) {
    $(squares[mines[i]]).css("background-color", "pink")
  };
};
// ---------------------------------------



// ---------------------------------------
// ---------------------------------------
// ---------------------------------------
// ---------------------------------------








// ---------------------------------------
// ---------------------------------------
// GAME FUNCTIONS
// ---------------------------------------
// ---------------------------------------


// sets background of new square
// ---------------------------------------
function squareBackground() {
  $(squares[currentSquare]).css("background-color", "#66FCF1");
};
// ---------------------------------------


// removes background from old square
// ---------------------------------------
function resetOldSquare() {
  $(squares[currentSquare]).css("background-color", "pink");
}
// ---------------------------------------



// checks if player won. (If current square = finish point)
// ---------------------------------------
function checkWin() {
  if (currentSquare === finishPoint) {
    alert("You won!")
    resetGame();
  };
}
// ---------------------------------------



// checks if player lost. (If current square = finish point)
// ---------------------------------------
function checkLoss() {
  if (mines.includes(currentSquare)) {
    alert("You lost :(")
    resetGame();
  };
}
// ---------------------------------------


// ---------------------------------------
// ---------------------------------------
// ---------------------------------------
// ---------------------------------------

