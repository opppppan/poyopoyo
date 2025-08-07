
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let player = { x: 0, y: 0 };
let playerName = "";
let currentMap = "normal";
const tileSize = 64;

const npcs = [
  { x: 2, y: 2, message: "ここはお寿司村です。" },
  { x: 4, y: 3, message: "🦀に近づかない方がいいよ…" }
];

const bugTile = { x: 7, y: 7 };

function startGame() {
  playerName = document.getElementById("playerName").value || "SUSHI";
  document.getElementById("startScreen").style.display = "none";
  canvas.style.display = "block";
  draw();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // グリッチ背景
  if (currentMap === "bug") {
    for (let i = 0; i < 64; i++) {
      ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
      ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 4, 4);
    }
  } else {
    ctx.fillStyle = "#999";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // NPC
  ctx.font = "24px sans-serif";
  ctx.fillStyle = "#fff";
  for (let npc of npcs) {
    ctx.fillText("👤", npc.x * tileSize, (npc.y + 1) * tileSize);
  }

  // 🦀バグトリガー
  ctx.fillText("🦀", bugTile.x * tileSize, (bugTile.y + 1) * tileSize);

  // プレイヤー 🍣と名前
  ctx.fillText("🍣", player.x * tileSize, (player.y + 1) * tileSize);
  ctx.fillText(playerName, player.x * tileSize, player.y * tileSize - 5);
}

function move(dir) {
  if (currentMap === "dialogue") return;
  const dx = { left: -1, right: 1, up: 0, down: 0 }[dir];
  const dy = { up: -1, down: 1, left: 0, right: 0 }[dir];
  player.x += dx;
  player.y += dy;
  checkCollision();
  draw();
}

function checkCollision() {
  // NPC会話
  for (let npc of npcs) {
    if (npc.x === player.x && npc.y === player.y) {
      alert(npc.message);
    }
  }
  // 🦀バグエリア突入
  if (player.x === bugTile.x && player.y === bugTile.y) {
    currentMap = "bug";
  }
}
