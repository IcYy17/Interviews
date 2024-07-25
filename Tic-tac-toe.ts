type Player = 'X' | 'O';
type Cell = Player | null;
type Board = Cell[][];

const emptyBoard: Board = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function checkWin(board: Board, player: Player): boolean {
  const winPatterns = [
    [[0, 0], [0, 1], [0, 2]], // Rows
    [[1, 0], [1, 1], [1, 2]], 
    [[2, 0], [2, 1], [2, 2]], 
    [[0, 0], [1, 0], [2, 0]], // Columns
    [[0, 1], [1, 1], [2, 1]], 
    [[0, 2], [1, 2], [2, 2]], 
    [[0, 0], [1, 1], [2, 2]], // Diagonals
    [[0, 2], [1, 1], [2, 0]]  
  ];
  return winPatterns.some(pattern => pattern.every(([r, c]) => board[r][c] === player));
}

function checkTie(board: Board): boolean {
  return board.flat().every(cell => cell !== null);
}

function makeMove(board: Board, player: Player, row: number, col: number): Board {
  const newBoard = board.map(row => row.slice());
  newBoard[row][col] = player;
  return newBoard;
}

// Function to convert board to string
function boardToString(board: Board): string {
  return board.map(row => row.map(cell => cell === null ? ' ' : cell).join('|')).join('\n-----\n');
}

// Array to store all game states
let gameCopies: Board[] = [];

function simulateGames(board: Board, player: Player): number {
  if (checkWin(board, 'X') || checkWin(board, 'O') || checkTie(board)) {
    gameCopies.push(board);
    return 1;
  }

  let counter = 0;
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === null) {
        const newBoard = makeMove(board, player, row, col);
        counter += simulateGames(newBoard, player === 'X' ? 'O' : 'X');
      }
    }
  }
  return counter;
}

const totalGames = simulateGames(emptyBoard, 'X');
console.log(`Total possible games: ${totalGames}`);

if (gameCopies.length > 0) {
  const firstGame = gameCopies[0];
  const lastGame = gameCopies[gameCopies.length - 1];

  console.log("First possible game:");
  console.log(boardToString(firstGame));

  console.log("\nLast possible game:");
  console.log(boardToString(lastGame));
}
