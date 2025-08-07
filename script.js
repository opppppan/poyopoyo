const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const startScreen = document.getElementById("startScreen");
const playerNameInput = document.getElementById("playerNameInput");
const startBtn = document.getElementById("startBtn");
const dialogBox = document.getElementById("dialogBox");

let player = {
  x: 400,
  y: 300,
  name: "",
  speed: 2
};

let npc = {
  x: 500,
  y: 300,
  dialog: "こんにちは、" + player.name + "さん。"
};

let keys = {};
let inDialog = false;

startBtn.addEventListener("click", () => {
  const name = playerNameInput.value.trim();
  if (!name) return;
  player.name = name;
  npc.dialog = "こんにちは、" + player.name + "さん。";
  startScreen.style.display = "none";
  canvas.style.display = "block";
  gameLoop();
});

document.addEventListener("keydown", (e) => {
  if (inDialog && e.key === "z") {
    dialogBox.classList.add("hidden");
    inDialog = false;
    return;
  }
  keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 移動
  if (!inDialog) {
    if (keys["ArrowUp"]) player.y -= player.speed;
    if (keys["ArrowDown"]) player.y += player.speed;
    if (keys["ArrowLeft"]) player.x -= player.speed;
    if (keys["ArrowRight"]) player.x += player.speed;
  }

  // プレイヤー描画
  ctx.fillStyle = "white";
  ctx.fillRect(player.x - 10, player.y - 10, 20, 20);
  ctx.font = "12px monospace";
  ctx.fillText(player.name, player.x - 20, player.y - 15);

  // NPC描画
  ctx.fillStyle = "yellow";
  ctx.fillRect(npc.x - 10, npc.y - 10, 20, 20);
  ctx.fillText("NPC", npc.x - 10, npc.y - 15);

  // NPCとの会話トリガー
  if (
    Math.abs(player.x - npc.x) < 30 &&
    Math.abs(player.y - npc.y) < 30 &&
    keys["z"] &&
    !inDialog
  ) {
    dialogBox.innerText = npc.dialog;
    dialogBox.classList.remove("hidden");
    inDialog = true;
  }

  requestAnimationFrame(gameLoop);
}
