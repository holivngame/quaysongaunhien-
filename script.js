let rotation = 0;
let winners = [];
let spinCount = 0;

// Chỉ định người trúng thưởng theo thứ tự quay (ẩn trên trang)
const predefinedWinners = [
  "Nguyễn Văn A",  // Người trúng lượt 1
  "Trần Thị B",    // Người trúng lượt 2
  // Thêm tiếp ở đây nếu muốn...
];

function spinWheel() {
  const textarea = document.getElementById("namesInput");
  let names = textarea.value.split("\n").map(n => n.trim()).filter(n => n && !winners.includes(n));

  if (names.length === 0) {
    alert("Vui lòng nhập danh sách tên hợp lệ!");
    return;
  }

  // Kiểm tra nếu có chỉ định trước
  let winner = predefinedWinners[spinCount] || names[Math.floor(Math.random() * names.length)];

  // Xác định vị trí của người thắng
  let index = names.indexOf(winner);
  if (index === -1) {
    alert("Người được chỉ định không có trong danh sách!");
    return;
  }

  const anglePerPerson = 360 / names.length;
  const stopAngle = 360 * 5 + (360 - index * anglePerPerson - anglePerPerson / 2);
  rotation = (rotation + stopAngle) % 360;

  const wheel = document.getElementById("wheel");
  wheel.style.transform = `rotate(${rotation}deg)`;

  setTimeout(() => {
    alert("🎉 Xin chúc mừng người chiến thắng: " + winner + "!");
    winners.push(winner);
    spinCount++;
    document.getElementById("title").textContent = `🎊 Người chiến thắng: ${winner}`;
  }, 5000);
}
