import * as readline from "node:readline";

const stdin = process.openStdin();
let turn = 'O';
let board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];

printBoard();
write("\nLocation : ");

stdin.addListener("data", (data) => {
  const input = String(data).trim();
  const playern = turn === 'O' ? '1' : '2'
  if (input === "quit") process.exit();
  if (!/\(\d,( |)\d\)/.test(input)) {
    locationWrite("Invaild location. e.g) (1, 2)");
    return;
  }
  const position = input.slice(1, -1).split(',').map(Number);
  if (position[0] < 1 || position[0] > 3 || position[1] < 1 || position[1] > 3) {
    locationWrite("Invaild location. e.g) (1, 2)");
    return;
  }
  if (board[position[1]-1][position[0]-1] !== ' ') {
    locationWrite("It's where it's already been placed.");
    return;
  }
  board[position[1]-1][position[0]-1] = turn;
  printBoard();

  if (checkDraw()) exitProcess("Draw...");
  else if (checkWin(turn)) exitProcess(`Winner is player ${playern}.`);

  turn = turn === 'O' ? 'X' : 'O';
  locationWrite(`Now it's player ${playern}'s turn.`);
});

process.on("exit", () => {
  console.log("\nKill process.");
});

function printBoard() {
  clearScreen();
  write(board.map(tiles => tiles.map(tile => ` ${tile} `).join('|')).join('\n-----------\n'));
}

function exitProcess(content: string) {
  write(content);
  process.exit();
}

function locationWrite(content: string = '') {
  write(content);
  write("Location : ");
}

function write(content: string) {
  process.stdout.write(`\n${content}`);
}

function clearScreen() {
  console.log('\n'.repeat(Math.max(process.stdout.rows - 2, 0)));
  readline.cursorTo(process.stdout, 0, 0);
  readline.clearScreenDown(process.stdout);
}

function checkWin(t: string) {
  const checkRow = (list: string[]) => list.every(tile => tile === t);
  const checkRows = (list: string[][]) => list.some(tiles => checkRow(tiles));
  const filteringBoard = (calc: (idx: number) => number) => board.map((tiles, idx) => tiles[calc(idx)]);
  let lines: string[][] = [];
  for (let y = 0; y < 3; y++) {
    let cells: string[] = [];
    for (let x = 0; x < 3; x++) cells.push(board[x][y]);
    lines.push(cells);
  }

  return checkRows(board) || checkRows(lines) || checkRow(filteringBoard(idx => idx)) || checkRow(filteringBoard(idx => Math.max(2-idx, 0)));
}

function checkDraw() {
  return !checkWin('O') && !checkWin('X') && board.every(tiles => tiles.every(tile => tile !== ' '));
}
