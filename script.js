const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const TILE_SIZE = 40;
const MAP_COLS = 16;
const MAP_ROWS = 12;

const PLAYER_SPEED = 5;

let playerName = prompt("プレイヤー名を入力してください") || "🍣";
let player = {
  x: 1,
  y: 1,
  name: playerName,
};

const npcs = [
  { x: 5, y: 3, text: "ぱやぱや", dir: 1 },
  { x: 10, y: 7, text: "ぽよぽよ", dir: -1 },
];

const crab = { x: 14, y: 10 };

let map = [];
let inBugArea = false;
let moveInterval;
let keyState = {};

function generateMap() {
  map = [];
  for (let y = 0; y < MAP_ROWS; y++) {
    const row = [];
    for (let x = 0; x < MAP_COLS; x++) {
      if (y === 0 || y === MAP_ROWS - 1 || x === 0 || x === MAP_COLS - 1 || (Math.random() < 0.15 && !(x === 1 && y === 1)))
        row.push(1);
      else
        row.push(0);
    }
    map.push(row);
  }
  // Reserve NPC and crab positions
  npcs.forEach(npc => map[npc.y][npc.x] = 2);
  map[crab.y][crab.x] = 3;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (inBugArea) ctx.filter = 'invert(1)';

  for (let y = 0; y < MAP_ROWS; y++) {
    for (let x = 0; x < MAP_COLS; x++) {
      if (map[y][x] === 1) {
        ctx.fillStyle = '#444';
        ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      }
    }
  }

  npcs.forEach(npc => {
    ctx.fillText("👤", npc.x * TILE_SIZE + 10, npc.y * TILE_SIZE + 30);
  });

  ctx.fillText("🦀", crab.x * TILE_SIZE + 10, crab.y * TILE_SIZE + 30);

  ctx.fillText("🍣", player.x * TILE_SIZE + 10, player.y * TILE_SIZE + 30);
  ctx.fillStyle = "white";
  ctx.fillText(player.name, player.x * TILE_SIZE + 5, player.y * TILE_SIZE - 5);

  ctx.filter = 'none';
}

function canMove(x, y) {
  return map[y][x] === 0;
}

function movePlayer(dx, dy) {
  const newX = player.x + dx;
  const newY = player.y + dy;

  if (!canMove(newX, newY)) return;

  // Check NPC collision
  for (let npc of npcs) {
    if (npc.x === newX && npc.y === newY) {
      alert(npc.text);
      return;
    }
  }

  // Move
  player.x = newX;
  player.y = newY;

  // Check crab for bug zone
  if (player.x === crab.x && player.y === crab.y) {
    inBugArea = true;
    setTimeout(() => inBugArea = false, 8000);
  }

  draw();
}

function handleKey(e) {
  switch (e.key) {
    case 'ArrowUp': movePlayer(0, -1); break;
    case 'ArrowDown': movePlayer(0, 1); break;
    case 'ArrowLeft': movePlayer(-1, 0); break;
    case 'ArrowRight': movePlayer(1, 0); break;
  }
}

function handleButton(dir) {
  switch (dir) {
    case 'up': movePlayer(0, -1); break;
    case 'down': movePlayer(0, 1); break;
    case 'left': movePlayer(-1, 0); break;
    case 'right': movePlayer(1, 0); break;
  }
}

document.addEventListener('keydown', handleKey);
document.getElementById('btnUp').addEventListener('click', () => handleButton('up'));
document.getElementById('btnDown').addEventListener('click', () => handleButton('down'));
document.getElementById('btnLeft').addEventListener('click', () => handleButton('left'));
document.getElementById('btnRight').addEventListener('click', () => handleButton('right'));

generateMap();
draw();
