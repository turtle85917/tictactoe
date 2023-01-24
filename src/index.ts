import * as readline from "node:readline";

const stdin = process.openStdin();
const board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];

process.stdin.setEncoding("utf-8");
printBoard();
write("\nLocation : ");

stdin.addListener("data", (data) => {
  clearScreen();
  const input = String(data).trim();
  printBoard();
  if (input === "quit") process.exit(10);
  if (!/\(\d,( |)\d\)/.test(input)) {
    locationWrite("\nInvaild location. e.g) (1, 2)");
    return;
  }
  const position = input.slice(1, -1).split(',').map(Number);
  if (position[0] < 1 || position[0] > 3 || position[1] < 1 || position[1] > 3) {
    locationWrite("\nInvaild location. e.g) (1, 2)");
    return;
  }
  locationWrite();
});

process.on("exit", () => {
  console.log("\nKill process.");
});

function printBoard() {
  clearScreen();
  write(board.map(tiles => tiles.map(tile => ` ${tile} `).join('|')).join('\n-----------\n'));
}

function locationWrite(content: string = '') {
  write(content);
  write("\nLocation : ");
}

function write(content: string) {
  process.stdout.write(content);
}

function clearScreen() {
  console.log('\n'.repeat(Math.max(process.stdout.rows - 2, 0)));
  readline.cursorTo(process.stdout, 0, 0);
  readline.clearScreenDown(process.stdout);
}
