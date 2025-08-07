const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const tileSize = 32;
const mapWidth = 10;
const mapHeight = 10;

let player = {
  x: 1,
  y: 1,
  name: "",
};

const map = [
  [1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,1],
  [1,0,1,0,1,1,0,1,0,1],
  [1,0,0,0,0,0,0,1,0,1],
  [1,0,1,0,1,0,0,0,0,1],
  [1,0,1,0,1,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,0,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1],
];

function drawMap() {
  for (let y = 0; y < mapHeight; y++) {
    for (let x = 0; x < mapWidth; x++) {
      const tile = map[y][x];
      ctx.fillStyle = tile === 1 ? "#444" : "#ccc";
      ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }
}

function drawPlayer() {
  ctx.fillStyle = "#0f0";
  ctx.fillRect(player.x * tileSize, player.y * tileSize, tileSize, tileSize);
  ctx.fillStyle = "#000";
  ctx.font = "12px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(player.name, player.x * tileSize + tileSize / 2, player.y * tileSize + tileSize / 1.5);
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMap();
  drawPlayer();
}

function canMove(x, y) {
  return map[y] && map[y][x] === 0;
}

document.addEventListener("keydown", (e) => {
  let newX = player.x;
  let newY = player.y;

  if (e.key === "ArrowUp") newY--;
  else if (e.key === "ArrowDown") newY++;
  else if (e.key === "ArrowLeft") newX--;
  else if (e.key === "ArrowRight") newX++;

  if (canMove(newX, newY)) {
    player.x = newX;
    player.y = newY;
  }

  render();
});

document.getElementById("startBtn").addEventListener("click", () => {
  const name = document.getElementById("playerName").value.trim();
  if (!name) return;
  player.name = name;

  document.getElementById("startScreen").classList.add("hidden");
  document.getElementById("gameScreen").classList.remove("hidden");

  render();
});
