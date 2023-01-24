import * as readline from "node:readline";
const stdin = process.openStdin();

clearScreen();
process.stdout.write("Input : ");
process.stdin.setEncoding("utf-8");

stdin.addListener("data", function(d) {
  clearScreen();
  if (String(d).trim() === "/kill") process.exit();
  process.stdout.write(`You entered: ${String(d).trim()}\nInput : `);
});

process.on("exit", () => {
  process.stdout.write("Kill process.");
});

function clearScreen() {
  console.log('\n'.repeat(Math.max(process.stdout.rows - 2, 0)));
  readline.cursorTo(process.stdout, 0, 0);
  readline.clearScreenDown(process.stdout);
}
