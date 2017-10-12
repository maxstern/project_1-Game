
// store all squares in an array (0 - 24)
let squares = $('.square');

// define edges
const allEdges = [0, 1, 2, 3, 4, 9, 14, 19, 24, 23, 22, 21, 20, 15, 10, 5];

let gameState = false;
let gameRound = 1;
$('.displayRound').text("Round: " + gameRound)

$('.sidePannel').css("margin", "100px 0px")

let currentSquare = setStartSquare();
let finishPoint = setFinishSquare();
let mines = setMines(0);

resetGame();




/*
// add array index to squares for referencing squares
// ---------------------------------------
// ---------------------------------------
for (i = 0; i < squares.length; i++) {
  $(squares[i]).text(i)
}
// ---------------------------------------
// ---------------------------------------
*/

/*
let rows = {
  a:[0, 1, 2, 3, 4],
  b:[5, 6, 7, 8, 9],
  c:[10, 11, 12, 13, 14],
  d:[15, 16, 17, 18, 19],
  e:[20, 21, 22, 23, 24]
}

let columns = {
  a:[0, 5, 10, 15, 20],
  b:[1, 6, 11, 16, 21],
  c:[2, 7, 12, 17, 22],
  d:[3, 8, 13, 18, 23],
  e:[4, 9, 14, 19, 24]
}

let example = [1, 6, 9];
let result = []

let abc = ['a', 'b', 'c', 'd', 'e']

function mineChecker() {
  for (let example in rows) {
    result.push(example);
  };
  console.log(result);
};

mineChecker();
*/





function resetGame() {
  console.log("Resetting game");
  mines = [];
  changeAllSquareColor('#66FCF1');
  resetSquareBg();
  currentSquare = setStartSquare();
  finishPoint = setFinishSquare();
  mines = setMines(gameRound);
  showMines();
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
    let randNum = (Math.random() * 4);
    randNum = Math.floor(randNum);

    let x = (allEdges.indexOf(currentSquare) + 6 + randNum);

    if (x > 15) {
      x = Math.abs(x - 15);
    }

    let finishPoint = allEdges[x];

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
};
// ---------------------------------------


// show START point
// ---------------------------------------
function showStartSquare() {
  $(squares[currentSquare]).css("background-image", "url('images/current.jpg')");
}
// ---------------------------------------

// show finish point
// ---------------------------------------
function showFinishSquare() {
  $(squares[finishPoint]).css("background-image", "url('images/finish.jpg')");
}
// ---------------------------------------

// Show mines
function showMines() {
  for (i = 0; i < mines.length; i++) {
    $(squares[mines[i]]).css("background-image", "url('images/mine.jpg')");
  };
};
// ---------------------------------------

// Hide mines
function hideMines() {
  for (i = 0; i < mines.length; i++) {
    $(squares[mines[i]]).css("background-image", "url('images/mesh.jpg')");
  };
};
// ---------------------------------------

// sets background of new square
// ---------------------------------------
function squareBackground() {
  $(squares[currentSquare]).css("background-image", "url('images/current.jpg')");
};
// ---------------------------------------


// removes background from old square
// ---------------------------------------
function resetOldSquare() {
  $(squares[currentSquare]).css("background-image", "url('images/mesh.jpg')");
}
// ---------------------------------------

// change all the squares to given color
// ---------------------------------------
function changeAllSquareColor(color) {
  for (i = 0; i < squares.length; i++) {
    $(squares[i]).css("background-color", color)
  };
};
// ---------------------------------------

// resets the square to default background image
// ---------------------------------------
function resetSquareBg() {
  for (i = 0; i < squares.length; i++) {
    $(squares[i]).css("background-image", "url('images/mesh.jpg')")
  };
};
// ---------------------------------------



// checks if player won. (If current square = finish point)
// ---------------------------------------
function checkWin() {
  if (currentSquare === finishPoint) {
    gameState = false;
    changeAllSquareColor('green');
    gameRound += 1;

    $('.displayRound').text("Round: " + gameRound)

    $('.sidePannel').css("margin", "100px 0px")

    resetGame();
  };
}
// ---------------------------------------



// checks if player lost. (If current square = finish point)
// ---------------------------------------
function checkLoss() {
  if (mines.includes(currentSquare)) {

    console.log(currentSquare);
    $(squares[currentSquare]).css("background-color", "red");

    gameState = false;
    $('.newHighScore').removeClass("show");

    let highScore = localStorage.getItem('highScore');

    if (gameRound > highScore || highScore === null) {
      console.log("New high score")
      localStorage.setItem('highScore', gameRound);
      highScore = localStorage.getItem('highScore');
      $('.newHighScore').addClass("show");
    };



    $('.finalScore').text("You got to round " + gameRound);
    $('.highScore').text("The high score is " + highScore);

    showMines();



    gameRound = 1;

    setTimeout(function(){
    $('.gameOverBanner').addClass("show");
  }, 400);
  };
}
// ---------------------------------------





// open info page
$('.information').click(function(){
  $('.infoBanner').addClass("show");
  $('.hs').text("High Score: " + localStorage.getItem('highScore'))
});

// hide info page
$('.hideInfo').click(function(){
  $('.infoBanner').removeClass("show");
});

// play again
$('.playAgain').click(function(){
    $('.gameOverBanner').removeClass("show");
    resetGame();
    gameState = false;
    $('.sidePannel').css("margin", "100px 0px")
});

// hide mines by pressing space bar
$(document).keypress(function(e) {
  if (e.which === 32) {
    gameState = true;
    $('.sidePannel').css("margin", "100px -80px")
    hideMines();
    showStartSquare();
    showFinishSquare();
  };
});

// hide mines by pressing button
$('.playButton').click(function(e) {
  e.stopPropagation();
    gameState = true;
    $('.sidePannel').css("margin", "100px -80px")
    hideMines();
    showStartSquare();
    showFinishSquare();
});

// reset highscore
$('.resetHighScore').click(function() {
  localStorage.setItem('highScore', 0);
  $('.hs').text("High Score: " + localStorage.getItem('highScore'))
});

// restart games
$('.resetGame').click(function(event) {
  gameRound = 1;
  $('.displayRound').text("Round: " + gameRound)
  resetGame();
});


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
  checkWin();
  checkLoss();
  };
});
// -------------------------------

