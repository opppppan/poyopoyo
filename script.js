const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const TILE_SIZE = 64;
const MAP_ROWS = 10;
const MAP_COLS = 10;

let player = {
  x: 0,
  y: 0,
  emoji: "🍣",
  name: "SUSHI"
};

let npcs = [
  { x: 2, y: 2, emoji: "👤", message: "ようこそ！" },
  { x: 5, y: 4, emoji: "👤", message: "この先に秘密がある..." }
];

let crab = { x: 9, y: 9, emoji: "🦀" };
let glitchMode = false;
let glitchTimer = 0;

const map = [
  [1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,1,0,0,0,0,1],
  [1,0,1,0,1,0,1,1,0,1],
  [1,0,1,0,0,0,0,1,0,1],
  [1,0,1,1,1,1,0,1,0,1],
  [1,0,0,0,0,1,0,0,0,1],
  [1,1,1,1,0,1,1,1,0,1],
  [1,0,0,1,0,0,0,1,0,1],
  [1,0,0,0,0,1,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1]
];

function drawTile(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < MAP_ROWS; y++) {
    for (let x = 0; x < MAP_COLS; x++) {
      const tile = map[y][x];
      drawTile(x, y, tile === 1 ? "#444" : "#ccc");
    }
  }

  // draw NPCs
  npcs.forEach(npc => {
    ctx.font = "48px serif";
    ctx.fillText(npc.emoji, npc.x * TILE_SIZE + 8, npc.y * TILE_SIZE + 52);
  });

  // draw crab
  ctx.fillText(crab.emoji, crab.x * TILE_SIZE + 8, crab.y * TILE_SIZE + 52);

  // draw player name
  ctx.fillStyle = "black";
  ctx.font = "16px sans-serif";
  ctx.fillText(player.name, player.x * TILE_SIZE + 8, player.y * TILE_SIZE - 4);

  // draw player
  ctx.font = "48px serif";
  ctx.fillText(player.emoji, player.x * TILE_SIZE + 8, player.y * TILE_SIZE + 52);

  // glitch mode overlay
  if (glitchMode) {
    ctx.fillStyle = "rgba(0,255,255,0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function isWall(x, y) {
  return map[y] && map[y][x] === 1;
}

function movePlayer(dx, dy) {
  if (glitchMode) return;

  const newX = player.x + dx;
  const newY = player.y + dy;
  if (!isWall(newX, newY)) {
    player.x = newX;
    player.y = newY;
  }

  // check for crab
  if (player.x === crab.x && player.y === crab.y) {
    glitchMode = true;
    glitchTimer = 300; // 5秒間
  }

  draw();
}

function update() {
  if (glitchMode) {
    glitchTimer--;
    if (glitchTimer <= 0) {
      glitchMode = false;
    }
  }
  draw();
  requestAnimationFrame(update);
}

document.getElementById("btnUp").addEventListener("click", () => movePlayer(0, -1));
document.getElementById("btnDown").addEventListener("click", () => movePlayer(0, 1));
document.getElementById("btnLeft").addEventListener("click", () => movePlayer(-1, 0));
document.getElementById("btnRight").addEventListener("click", () => movePlayer(1, 0));

window.addEventListener("load", () => {
  const name = prompt("あなたの名前をアルファベットで入力してください") || "SUSHI";
  player.name = name;
  draw();
  update();
});