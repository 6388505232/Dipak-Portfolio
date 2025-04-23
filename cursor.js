const cursor = document.getElementById("cursor");
const cursorBorder = document.getElementById("cursor-border");

let mouseX = 0;
let mouseY = 0;
let borderX = 0;
let borderY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Instant movement of dot
  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";
});

// Smooth follow effect for border
function animate() {
  // Lerp motion
  borderX += (mouseX - borderX) * 0.1;
  borderY += (mouseY - borderY) * 0.1;

  cursorBorder.style.left = borderX + "px";
  cursorBorder.style.top = borderY + "px";

  requestAnimationFrame(animate);
}
animate();
