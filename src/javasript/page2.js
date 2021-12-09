const AUTHOR_URL = "../page3.html";
let GAME;
let gameGrid;
let score = 0;
let table;

const gameInit = () => {
  const startButton = document.createElement("div");
  startButton.className = "button";
  startButton.innerText = "Play";
  startButton.addEventListener("mouseup", () => {
    startButton.style.display = "none";
    table = document.createElement("table");
    table.style.display = "none";
    GAME.append(table);
    drawScore();
    gameLoadLevel(1);
  });
  GAME.append(startButton);
};

const gameOver = () => {
  table.style.display = "none";
  scoreText.style.display = "none";
  let gameOverContainer = document.createElement("div");
  let btn = document.createElement("div");
  let h1 = document.createElement("h1");
  let h2 = document.createElement("h2");
  gameOverContainer.className = "gameOverContainer";
  btn.className = "button";
  h1.innerText = "Test over!";
  h2.innerText = "Your score: " + score;
  btn.innerText = "Try Again";
  btn.addEventListener("mouseup", () => {
    location.reload();
  });
  gameOverContainer.append(h1);
  gameOverContainer.append(h2);
  gameOverContainer.append(btn);
  GAME.append(gameOverContainer);
};

const createGrid = (size) => {
  let x = [];
  for (var i = 0; i < size; i++) {
    x[i] = [];
    for (var j = 0; j < size; j++) {
      x[i][j] = 0;
    }
  }
  return x;
};

let scoreText;
const drawScore = () => {
  if (scoreText == null) {
    scoreText = document.createElement("div");
  }
  scoreText.innerText = "Your Score: " + score.toString();
  scoreText.className = "score";
  GAME.append(scoreText);
};

/*
    Design:
        Increase size by 1, every 3 levels.         
        Increase path length by 2, every level.

        3   3   <- start at 3
        3   4
        3   5
        4   6
        4   7
        4   ...
        5   ...
        5   ...
        5   ...
*/

let userIndex = 0;
const drawGrid = (grid, __pathHistory) => {
  table.style.display = "table";
  table.innerHTML = "";
  let delay = 0.5;
  size = grid.length;
  userIndex = 0;
  for (var i = 0; i < size; i++) {
    let row = document.createElement("tr");
    for (var j = 0; j < size; j++) {
      let col = document.createElement("td");
      if (grid[i][j] == "1") {
        let pos = __pathHistory.indexOf(JSON.stringify([i, j]));
        col.className = "active";
        col.style.animation =
          "0.2s blockFadeIn linear " + (delay * pos).toString() + "s forwards";
      } else if (__pathHistory.length == 0) {
        col.className = "user";
        col.innerText = JSON.stringify([i, j]);
        col.addEventListener("click", function () {
          if (pathHistory[userIndex] == col.innerText) {
            userIndex += 1;
            this.style.backgroundColor = "#fff";
          } else {
            gameOver();
          }
          if (userIndex >= pathHistory.length) {
            score += 10;
            drawScore();
            gameLoadLevel(++currentLevel);
          }
        });
      }
      row.append(col);
    }
    table.append(row);
  }
  if (__pathHistory.length > 0)
    setTimeout(() => {
      drawGrid(createGrid(grid.length), []);
    }, delay * pathHistory.length * 1000);
};

/*
    0 % 3 = 0 -> size = 2 + 1 = 3;
    3 % 3 = 0 -> size = 3 + 1 = 4;
*/

let pathHistory = [];
let currentLevel;
let gridSizeIndex = 2;
const gameLoadLevel = (level) => {
  currentLevel = level;
  if ((level - 1) % 3 == 0) gridSizeIndex = gridSizeIndex + 1;
  let size = gridSizeIndex;
  gameGrid = createGrid(size);
  let startPosX = Math.floor(Math.random() * size);
  let startPosY = Math.floor(Math.random() * size);
  let pathPosX = startPosX;
  let pathPosY = startPosY;
  let pathLength = 2 + level; //start at 3
  let pathIndex = 0;
  let timeout = 20;
  pathHistory = [];
  pathHistory.push(JSON.stringify([startPosY, startPosX]));
  gameGrid[startPosY][startPosX] = 1;
  for (var i = 0; i < pathLength - 1; i++) {
    if (pathIndex > timeout) break;
    let directionTable = ["u", "d", "l", "r"];
    let pathNewY = pathPosY;
    let pathNewX = pathPosX;
    if (pathPosX + 1 >= size) {
      let index = directionTable.indexOf("r");
      directionTable.splice(index, 1);
    }
    if (pathPosY + 1 >= size) {
      let index = directionTable.indexOf("d");
      directionTable.splice(index, 1);
    }
    if (pathPosX == 0) {
      let index = directionTable.indexOf("l");
      directionTable.splice(index, 1);
    }
    if (pathPosY == 0) {
      let index = directionTable.indexOf("u");
      directionTable.splice(index, 1);
    }
    let direction =
      directionTable[Math.floor(Math.random() * directionTable.length)];
    if (direction == "u") {
      pathNewY -= 1;
    } else if (direction == "d") {
      pathNewY += 1;
    } else if (direction == "l") {
      pathNewX -= 1;
    } else if (direction == "r") {
      pathNewX += 1;
    }
    if (pathHistory.includes(JSON.stringify([pathNewY, pathNewX]))) {
      pathIndex += 1;
      i -= 1;
      continue;
    }
    [pathPosY, pathPosX] = [pathNewY, pathNewX];
    gameGrid[pathPosY][pathPosX] = 1;
    pathHistory.push(JSON.stringify([pathPosY, pathPosX]));
  }
  drawGrid(gameGrid, pathHistory);
};

window.addEventListener("DOMContentLoaded", () => {
  const sourceLink = document.getElementById("sourcelink");
  const loader = document.getElementsByClassName("loading")[0];
  GAME = document.getElementById("game");
  loader.style.display = "none";
  sourceLink.addEventListener("click", () => {
    window.open(AUTHOR_URL, "_parent");
  });
  gameInit();
});
