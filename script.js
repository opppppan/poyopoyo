const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const tileSize = 32;
const mapWidth = 16;
const mapHeight = 16;
let glitchMode = false;
let glitchTimer = 0;

const player = {
  x: 1,
  y: 1,
  name: "🍣",
};

const npcs = [
  { x: 3, y: 3, char: "👤" },
  { x: 5, y: 7, char: "👤" },
];

const crab = { x: 14, y: 14, char: "🦀" };

const walls = [
  [0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0],[10,0],[11,0],[12,0],[13,0],[14,0],[15,0],
  [0,1],[15,1],
  [0,2],[15,2],
  [0,3],[15,3],
  [0,4],[15,4],
  [0,5],[15,5],
  [0,6],[15,6],
  [0,7],[15,7],
  [0,8],[15,8],
  [0,9],[15,9],
  [0,10],[15,10],
  [0,11],[15,11],
  [0,12],[15,12],
  [0,13],[15,13],
  [0,14],[15,14],
  [0,15],[1,15],[2,15],[3,15],[4,15],[5,15],[6,15],[7,15],[8,15],[9,15],[10,15],[11,15],[12,15],[13,15],[14,15],[15,15],
  [4,4],[5,4],[6,4],[7,4],
  [8,8],[9,8],[10,8],
  [6,10],[7,10],[8,10]
];

function drawTile(x, y, char, color = "#000") {
  ctx.fillStyle = glitchMode ? "#f0f" : color;
  ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
  ctx.font = "20px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#fff";
  ctx.fillText(char, x * tileSize + tileSize / 2, y * tileSize + tileSize / 2);
}

function isWall(x, y) {
  return walls.some(w => w[0] === x && w[1] === y);
}

function movePlayer(dx, dy) {
  const nx = player.x + dx;
  const ny = player.y + dy;
  if (nx < 0 || nx >= mapWidth || ny < 0 || ny >= mapHeight) return;
  if (isWall(nx, ny)) return;
  player.x = nx;
  player.y = ny;

  if (player.x === crab.x && player.y === crab.y) {
    glitchMode = true;
    glitchTimer = 300; // 5秒
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < mapHeight; y++) {
    for (let x = 0; x < mapWidth; x++) {
      drawTile(x, y, "", "#666");
    }
  }

  walls.forEach(w => drawTile(w[0], w[1], "", "#333"));

  npcs.forEach(n => drawTile(n.x, n.y, n.char));
  drawTile(crab.x, crab.y, crab.char);
  drawTile(player.x, player.y, player.name);

  ctx.fillStyle = "#0f0";
  ctx.font = "12px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("YOU", player.x * tileSize + tileSize / 2, player.y * tileSize - 4);
}

function update() {
  if (glitchMode) {
    if (glitchTimer-- <= 0) {
      glitchMode = false;
    }
  }
  draw();
  requestAnimationFrame(update);
}

document.getElementById("btnLeft").onclick = () => movePlayer(-1, 0);
document.getElementById("btnRight").onclick = () => movePlayer(1, 0);
document.getElementById("btnUp").onclick = () => movePlayer(0, -1);
document.getElementById("btnDown").onclick = () => movePlayer(0, 1);

update();
