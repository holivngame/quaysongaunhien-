const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
let names = [];
let winners = [];
let spinCount = 0;
let currentRotation = 0;
let spinning = false;

const predefinedWinners = [
  "Nguyễn Văn A",
  "Trần Thị B",
];

document.getElementById("spinBtn").addEventListener("click", spinWheel);

function drawWheel(names, rotation = 0) {
  const total = names.length;
  const angle = (2 * Math.PI) / total;

  ctx.clearRect(0, 0, 400, 400);

  for (let i = 0; i < total; i++) {
    const startAngle = i * angle + rotation;
    const endAngle = startAngle + angle;

    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.arc(200, 200, 190, startAngle, endAngle);
    ctx.fillStyle = getColor(i);
    ctx.fill();

    ctx.save();
    ctx.translate(200, 200);
    ctx.rotate(startAngle + angle / 2);
    ctx.fillStyle = "#fff";
    ctx.font = "bold 14px sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(names[i], 180, 0);
    ctx.restore();
  }
}

function getColor(index) {
  const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#66ff66", "#9966ff", "#ff9933", "#ff66b3", "#4dc9f6"];
  return colors[index % colors.length];
}

function spinWheel() {
  if (spinning) return;

  const input = document.getElementById("namesInput").value.trim();
  names = input.split("\n").map(n => n.trim()).filter(n => n && !winners.includes(n));

  if (names.length === 0) {
    alert("Vui lòng nhập danh sách hợp lệ!");
    return;
  }

  drawWheel(names, currentRotation);

 
::contentReference[oaicite:0]{index=0}
 
