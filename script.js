const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 512;
const tileSize = 32;
let username = "🍣";
let showUsername = false;
let gameStarted = false;

const map = [
  "################",
  "#     #        #",
  "# ### # ###### #",
  "# #   #      # #",
  "# # ####### ## #",
  "# #       #    #",
  "# ###### #######",
  "#    #         #",
  "#### ######### #",
  "#    #     🦀  #",
  "################"
];

const player = { x: 1, y: 1 };
let npcs = [
  { x: 4, y: 2, emoji: "🧍", message: "ぱやぱや", dx: 1 },
  { x: 10, y: 5, emoji: "🧍", message: "ぽよぽよ", dx: -1 }
];
let keys = {};

document.getElementById("start-btn").onclick = () => {
  const input = document.getElementById("username-input").value.trim();
  if (input) username = input;
  showUsername = true;
  document.getElementById("username-screen").style.display = "none";
  gameStarted = true;
  requestAnimationFrame(gameLoop);
};

document.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

document.getElementById("btn-up").addEventListener("touchstart", () => keys["ArrowUp"] = true);
document.getElementById("btn-up").addEventListener("touchend", () => keys["ArrowUp"] = false);
document.getElementById("btn-down").addEventListener("touchstart", () => keys["ArrowDown"] = true);
document.getElementById("btn-down").addEventListener("touchend", () => keys["ArrowDown"] = false);
document.getElementById("btn-left").addEventListener("touchstart", () => keys["ArrowLeft"] = true);
document.getElementById("btn-left").addEventListener("touchend", () => keys["ArrowLeft"] = false);
document.getElementById("btn-right").addEventListener("touchstart", () => keys["ArrowRight"] = true);
document.getElementById("btn-right").addEventListener("touchend", () => keys["ArrowRight"] = false);

function canMove(x, y) {
  const cell = map[y][x];
  return cell !== "#" && !npcs.some(npc => npc.x === x && npc.y === y);
}

function gameLoop() {
  update();
  draw();
  if (gameStarted) requestAnimationFrame(gameLoop);
}

function update() {
  if (keys["ArrowUp"] && canMove(player.x, player.y - 1)) player.y--;
  if (keys["ArrowDown"] && canMove(player.x, player.y + 1)) player.y++;
  if (keys["ArrowLeft"] && canMove(player.x - 1, player.y)) player.x--;
  if (keys["ArrowRight"] && canMove(player.x + 1, player.y)) player.x++;

  npcs.forEach(npc => {
    const nextX = npc.x + npc.dx;
    if (map[npc.y][nextX] === " " && !npcs.some(n => n !== npc && n.x === nextX && n.y === npc.y)) {
      npc.x = nextX;
    } else {
      npc.dx *= -1;
    }
  });

  npcs.forEach(npc => {
    if (npc.x === player.x && npc.y === player.y) {
      alert(npc.message);
    }
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const cell = map[y][x];
      if (cell === "#") {
        ctx.fillStyle = "#444";
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      } else if (cell === "🦀") {
        ctx.font = "28px sans-serif";
        ctx.fillText("🦀", x * tileSize + 4, y * tileSize + 28);
      }
    }
  }

  npcs.forEach(npc => {
    ctx.font = "28px sans-serif";
    ctx.fillText(npc.emoji, npc.x * tileSize + 4, npc.y * tileSize + 28);
  });

  ctx.font = "28px sans-serif";
  ctx.fillText("🍣", player.x * tileSize + 4, player.y * tileSize + 28);

  if (showUsername) {
    ctx.font = "16px sans-serif";
    ctx.fillStyle = "#fff";
    ctx.fillText(username, player.x * tileSize, player.y * tileSize - 5);
  }
}
