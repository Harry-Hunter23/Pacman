document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const scoreDisplay = document.getElementById("score");
  const gridWidth = 28; // 28 cells in one row
  let score = 0;
  let pacmanCurrentIndex = 490; // Initial position of Pac-Man
  const squares = [];
  const layout = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0,
    1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0,
    1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
    1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1,
    1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2,
    2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1,
    2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1,
    0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
    1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0,
    0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1,
  ];

  // Create the game board
  const createBoard = () => {
    for (let i = 0; i < layout.length; i++) {
      const square = document.createElement("div");
      square.id = i;
      grid.appendChild(square);
      squares.push(square);
      if (layout[i] === 1) {
        square.classList.add("wall");
      } else if (layout[i] === 0) {
        square.classList.add("coin");
      } else if (layout[i] === 2) {
        square.classList.add("ghostlair");
      } else if (layout[i] === 3) {
        square.classList.add("power-coin");
      }
    }
  };

  createBoard();

  // Initial position of Pac-Man
  squares[pacmanCurrentIndex].classList.add("pac-man", "right");

  // Ghost class
  class Ghost {
    constructor(classname, startIndex, speed) {
      this.classname = classname;
      this.startIndex = startIndex;
      this.currentIndex = startIndex;
      this.speed = speed;
      this.timerId = NaN;
      this.isScared = false;
    }

    move() {
      const directions = [-1, +1, -gridWidth, +gridWidth];
      let direction = directions[Math.floor(Math.random() * directions.length)];

      this.timerId = setInterval(() => {
        if (
          !squares[this.currentIndex + direction].classList.contains("wall") &&
          !squares[this.currentIndex + direction].classList.contains("ghost") &&
          !squares[this.currentIndex + direction].classList.contains(
            "ghostlair"
          )
        ) {
          squares[this.currentIndex].classList.remove(
            "ghost",
            this.classname,
            "scared-ghost"
          );
          this.currentIndex += direction;
          squares[this.currentIndex].classList.add("ghost", this.classname);
        } else {
          direction = directions[Math.floor(Math.random() * directions.length)];
        }

        if (squares[this.currentIndex].classList.contains("pac-man")) {
          checkGameOver();
        }
      }, this.speed);
    }

    leaveLair() {
      const directions = [-1, +1, -gridWidth, +gridWidth];
      let direction = directions[Math.floor(Math.random() * directions.length)];

      const leaveInterval = setInterval(() => {
        if (!squares[this.currentIndex].classList.contains("ghostlair")) {
          clearInterval(leaveInterval);
          this.move();
        } else {
          if (
            !squares[this.currentIndex + direction].classList.contains(
              "wall"
            ) &&
            !squares[this.currentIndex + direction].classList.contains("ghost")
          ) {
            squares[this.currentIndex].classList.remove(
              "ghost",
              this.classname,
              "scared-ghost"
            );
            this.currentIndex += direction;
            squares[this.currentIndex].classList.add("ghost", this.classname);
          } else {
            direction =
              directions[Math.floor(Math.random() * directions.length)];
          }
        }
      }, 300);
    }
  }

  // Instantiate ghosts
  const ghosts = [
    new Ghost("rahul", 348, 250),
    new Ghost("ramesh", 376, 400),
    new Ghost("suresh", 351, 300),
    new Ghost("vicky", 379, 500),
  ];

  // Add ghosts to the grid and start their movement
  ghosts.forEach((ghost) => {
    squares[ghost.startIndex].classList.add(ghost.classname, "ghost");
    ghost.leaveLair();
  });

  // Move Pac-Man
  function movePacman(e) {
    squares[pacmanCurrentIndex].classList.remove(
      "pac-man",
      "right",
      "down",
      "left",
      "up"
    ); // Start fresh so that the old Pac-Man does not leave behind
    switch (e.key) {
      case "ArrowLeft":
        if (
          pacmanCurrentIndex % gridWidth !== 0 &&
          !squares[pacmanCurrentIndex - 1].classList.contains("wall") &&
          !squares[pacmanCurrentIndex - 1].classList.contains("ghostlair")
        ) {
          pacmanCurrentIndex -= 1;
        }
        squares[pacmanCurrentIndex].classList.add("pac-man", "left");
        break;
      case "ArrowRight":
        if (
          pacmanCurrentIndex % gridWidth < gridWidth - 1 &&
          !squares[pacmanCurrentIndex + 1].classList.contains("wall") &&
          !squares[pacmanCurrentIndex + 1].classList.contains("ghostlair")
        ) {
          pacmanCurrentIndex += 1;
        }
        squares[pacmanCurrentIndex].classList.add("pac-man", "right");
        break;
      case "ArrowUp":
        if (
          pacmanCurrentIndex - gridWidth >= 0 &&
          !squares[pacmanCurrentIndex - gridWidth].classList.contains("wall") &&
          !squares[pacmanCurrentIndex - gridWidth].classList.contains(
            "ghostlair"
          )
        ) {
          pacmanCurrentIndex -= gridWidth;
        }
        squares[pacmanCurrentIndex].classList.add("pac-man", "up");
        break;
      case "ArrowDown":
        if (
          pacmanCurrentIndex + gridWidth < gridWidth * gridWidth &&
          !squares[pacmanCurrentIndex + gridWidth].classList.contains("wall") &&
          !squares[pacmanCurrentIndex + gridWidth].classList.contains(
            "ghostlair"
          )
        ) {
          pacmanCurrentIndex += gridWidth;
        }
        squares[pacmanCurrentIndex].classList.add("pac-man", "down");
        break;
    }
    coinEaten(); // Check if a coin is eaten after moving
    powerCoinEaten(); // Check if a power coin is eaten after moving
    checkGameOver(); // Check if the game is over
    checkGameWin(); // Check if the game is won
  }

  document.addEventListener("keyup", movePacman);

  // Pac-Man eating a coin, the coin will be removed
  function coinEaten() {
    if (squares[pacmanCurrentIndex].classList.contains("coin")) {
      score++;
      scoreDisplay.textContent = `Score: ${score}`; // Corrected property to update score
      squares[pacmanCurrentIndex].classList.remove("coin");
    }
  }

  // Pac-Man eating a power coin
  function powerCoinEaten() {
    if (squares[pacmanCurrentIndex].classList.contains("power-coin")) {
      score += 10; // Increase score for power coin
      scoreDisplay.textContent = `Score: ${score}`;
      squares[pacmanCurrentIndex].classList.remove("power-coin");
      // Add scared-ghost class to all ghosts
      document
        .querySelectorAll(".ghost")
        .forEach((ghost) => ghost.classList.add("scared-ghost"));
      setTimeout(() => {
        document
          .querySelectorAll(".ghost")
          .forEach((ghost) => ghost.classList.remove("scared-ghost"));
      }, 10000); // Remove scared state after 10 seconds
    }
  }

  // Check for game over
  function checkGameOver() {
    if (
      squares[pacmanCurrentIndex].classList.contains("ghost") &&
      !squares[pacmanCurrentIndex].classList.contains("scared-ghost")
    ) {
      document.removeEventListener("keyup", movePacman);
      ghosts.forEach((ghost) => clearInterval(ghost.timerId));
      setTimeout(() => alert("Game Over!"), 500);
    }
  }

  // Check for game win
  function checkGameWin() {
    if (score >= 274) {
      // Adjust score to match the total number of coins and power coins
      document.removeEventListener("keyup", movePacman);
      ghosts.forEach((ghost) => clearInterval(ghost.timerId));
      setTimeout(() => alert("You Win!"), 500);
    }
  }
});
