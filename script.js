let rotation = 0;
let winners = [];
let spinCount = 0;
let names = [];
let canvas = document.getElementById("wheel");
let ctx = canvas.getContext("2d");
let currentAngle = 0;

// Người trúng thưởng theo lượt quay (ẩn)
const predefinedWinners = [
  "Nguyễn Văn A",  // Lượt 1
  "Trần Thị B",    // Lượt 2
  // Thêm tại đây nếu muốn
];

// Hàm vẽ bánh xe với tên
function drawWheel(names) {
  let total = names.length;
  let arc = 2 * Math.PI / total;

  ctx.clearRect(0, 0, 400, 400);

  for (let i = 0; i < total; i++) {
    let angle = i * arc + currentAngle;
    ctx.beginPath();
    ctx.fillStyle = getRandomColor();
    ctx.moveTo(200, 200);
    ctx.arc(200, 200, 190, angle, angle + arc);
    ctx.fill();

    // Tên
    ctx.save();
    ctx.translate(200, 200);
    ctx.rotate(angle + arc / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "white";
    ctx.font = "bold 14px sans-serif";
    ctx.fillText(names[i], 180, 0);
    ctx.restore();
  }
}

// Màu ngẫu nhiên cho từng phần
function getRandomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
  return color;
}

function spinWheel() {
  const textarea = document.getElementById("namesInput");
  names = textarea.value.split("\n").map(n => n.trim()).filter(n => n && !winners.includes(n));

  if (names.length === 0) {
    alert("Vui lòng nhập danh sách tên hợp lệ!");
    return;
  }

  drawWheel(names); // Cập nhật bánh xe theo tên hiện tại

  let winner = predefinedWinners[spinCount] || names[Math.floor(Math.random() * names.length)];
  let index = names.indexOf(winner);

  if (index === -1) {
    alert("Người được chỉ định không có trong danh sách!");
    return;
  }

  let arc = 360 / names.length;
  let stopAngle = (360 * 5) + (360 - index * arc - arc / 2);
  rotation = stopAngle;

  let duration = 5000;
  let start = null;

  function animate(timestamp) {
    if (!start) start = timestamp;
    let progress = timestamp - start;
    let easeOut = 1 - Math.pow(1 - progress / duration, 3);
    currentAngle = (rotation * easeOut) * Math.PI / 180;
    drawWheel(names);

    if (progress < duration) {
      requestAnimationFrame(animate);
    } else {
      winners.push(winner);
      spinCount++;
      alert("🎉 Xin chúc mừng người chiến thắng: " + winner + "!");
      document.getElementById("title").textContent = `🎊 Người chiến thắng: ${winner}`;
    }
  }

  requestAnimationFrame(animate);
}
