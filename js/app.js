const gameBoard = (() => {
  const board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  let xBoxes  = [];
  let oBoxes  = [];

  let winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  let whichPlayer = (sign) => {
    return sign === 'X' ? xBoxes : oBoxes;
  };

  let valid = (box) => {
    return board.includes(box) && !xBoxes.includes(box) && !oBoxes.includes(box);
  };

  let reset = () => {
    xBoxes.length = 0;
    oBoxes.length = 0;
  };

  let claim = (sign, box) => {
    if (valid(box)) {
      let playerBoxes = whichPlayer(sign);

      playerBoxes.push(box);

      return true;
    }
    return false;
  };

  let checkVictory = (sign) => {
    let victory = false;
    let playerBoxes = whichPlayer(sign);

    if (playerBoxes .length < 3) { return victory; }

    for (let i = 0; i < winningCombos.length; i++) {
      let combo = winningCombos[i];

      combo = combo.filter(b => !playerBoxes.includes(b));

      if (combo.length === 0) { victory = true; }
    }

    return victory;
  };

  return { board, xBoxes, oBoxes, reset, claim, checkVictory };
})();

class Player {
  constructor(sign) {
    this.sign = sign;
  }

  get sign() { return this._sign; };
  set sign(newSign) { this._sign = newSign; };

  getInput() {
    return parseInt(prompt(`Player ${this.sign}, please choose a box (0-8)`));
  }

  static new(params) {
    return new this(params);
  }
};

const controller = (() => {
  let gameOver = false;

  let play = (players) => {
    while (!gameOver) {
      let player = players.shift();
      let input;

      while (!gameBoard.claim(player.sign, input)) {
        input = player.getInput();
      }

      gameOver = gameBoard.checkVictory(player.sign);

      players.push(player);
    }

    console.log(`Player ${players[1].sign} has won!`);
  };

  return { play };
})();

let x = Player.new('X');
let o = Player.new('O');

// Play:
// controller.play([x, o]);

// Reset board:
// gameBoard.reset();
