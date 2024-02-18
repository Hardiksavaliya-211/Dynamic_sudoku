const gameBoard = document.querySelector("#gameBoard");
const digits = document.querySelector("#digits");
const deleteNum = document.querySelector("#delete");
const mistake = document.querySelector("#mistake");
let lastSelected = null;
let error = 0;

var arr = [[], [], [], [], [], [], [], [], []];
var board = [];

for (var i = 0; i < 9; i++) {
  for (var j = 0; j < 9; j++) {
    arr[i][j] = document.getElementById(i * 9 + j);
  }
}

function Print(arr) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      console.log(arr[i][j]);
    }
  }
}

function FillBoard(board) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (board[i][j] != 0) {
        arr[i][j].innerText = board[i][j];
      } else arr[i][j].innerText = "";
    }
  }
}

function isValid(board, i, j, num, n) {
  for (let x = 0; x < n; x++) {
    if (board[i][x] == num || board[x][j] == num) {
      return false;
    }
  }

  let rn = Math.sqrt(n);
  let si = i - (i % rn);
  let sj = j - (j % rn);

  for (let x = si; x < si + rn; x++) {
    for (let y = sj; y < sj + rn; y++) {
      if (board[x][y] == num) {
        return false;
      }
    }
  }

  return true;
}

function SudokuSolver(board, i, j, n) {
  if (i == n) {
    FillBoard(board);
    return true;
  }

  if (j == n) {
    return SudokuSolver(board, i + 1, 0, n);
  }

  if (board[i][j] != 0) {
    return SudokuSolver(board, i, j + 1, n);
  }


  for (let num = 1; num <= 9; num++) {
    // Check is num can be filled
    if (isValid(board, i, j, num, n)) {
      board[i][j] = num;
      let subAns = SudokuSolver(board, i, j + 1, n);
      if (subAns) {
        return true;
      }
      board[i][j] = 0;
    }
  }

  return false;
}

//when window load puzzle create
window.onload = () => {
  start();
  var xhrRequest = new XMLHttpRequest();
  xhrRequest.onload = function () {
    var response = JSON.parse(xhrRequest.response);
    board = response.board;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const div = document.createElement("div");
        div.classList.add("tile");
        div.addEventListener("click", selectTile);
        div.setAttribute("row", i);
        div.setAttribute("col", j);

        if (board[i][j] != 0) {
          div.innerText = board[i][j];
          div.classList.add("filled");
        }

        if (i == 2 || i == 5) {
          div.classList.add("border-bottom");
        }

        if (j == 2 || j == 5) {
          div.classList.add("border-right");
        }
        gameBoard.appendChild(div);
      }
    }
    arr = board;
    SudokuSolver(arr, 0, 0, 9);
  };
  xhrRequest.open("get", "https://sugoku.onrender.com/board?difficulty=easy");
  // we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random

  xhrRequest.send();

  // creating digits
  for (let i = 0; i < 9; i++) {
    const div = document.createElement("div");
    div.classList.add("tile");
    div.addEventListener("click", addNumber);
    div.innerText = i + 1;
    digits.appendChild(div);
  }
};

//select Tile
function selectTile() {
  if (lastSelected != null) {
    lastSelected.classList.remove("select-tile");
  }
  lastSelected = this;
  lastSelected.classList.add("select-tile");
}


function addNumber() {
  if (
    lastSelected.innerText == "" ||
    lastSelected.classList.contains("danger")
  ) {
    lastSelected.innerText = this.innerText;
  }

  let row = lastSelected.getAttribute("row");
  let col = lastSelected.getAttribute("col");
  if (arr[row][col] == lastSelected.innerText) {
    lastSelected.classList.remove("danger");
  } else {
    lastSelected.classList.add("danger");
    addErrorandDisplay();
  }

  if (error > 2) {
    alert("You Lost!");
    location.reload();
  }

  if (isAllTilesFilled()) {
    const allTiles = gameBoard.querySelectorAll(".tile");
    let userAnswer = [...allTiles].map((tile) => {
      return tile.innerText;
    });
    let num = 0;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (arr[i][j] != userAnswer[num]) {
          allTiles[num].classList.add("danger");
        }
        num++;
      }
    }

    let dangerClass = [...allTiles].some((tile) => {
      return tile.classList.contains("danger");
    });

    if (dangerClass) {
      if (error > 2) {
        alert("you lost!");
        location.reload();
      }
    } else {
      alert("Congratuations! You win the puzzle!");
    }
  }
}


deleteNum.onclick = () => {
  if (!lastSelected.classList.contains("filled")) {
    lastSelected.innerText = "";
  }
};


function addErrorandDisplay() {
  error++;
  mistake.innerText = error;
}


function isAllTilesFilled() {
  const allTiles = gameBoard.querySelectorAll(".tile");
  return [...allTiles].every((tile) => {
    return tile.innerText != "";
  });
}

let hour1 = document.getElementById("hour");
let minite1 = document.getElementById("minite");
let second1 = document.getElementById("second");
let [hour, minite, second] = [0, 0, 0];

function stopwatch() {
  second++;
  if (second == 60) {
    second = 0;
    minite++;
  }
  if (minite == 60) {
    minite = 0;
    hour++;
  }
  let s = second < 10 ? "0" + second : second;
  let m = minite < 10 ? "0" + minite : minite;
  let h = hour < 10 ? "0" + hour : hour;
  hour1.innerText = h;
  minite1.innerText = m;
  second1.innerText = s;
}
function start() {
  setInterval(stopwatch, 1000);
}
