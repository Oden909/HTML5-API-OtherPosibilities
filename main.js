document.getElementById('back').addEventListener('click', () => history.back());
document.getElementById('forward').addEventListener('click', () => history.forward());

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let x = 50, y = 50, dx = 2, dy = 2, radius = 20;
function drawBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#339933';
    ctx.fill();
    ctx.shadowColor = '#3aaa3a';
    ctx.shadowBlur = 50;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.closePath();
    x += dx;
    y += dy;
    if (x + radius > canvas.width || x - radius < 0) dx = -dx;
    if (y + radius > canvas.height || y - radius < 0) dy = -dy;
    requestAnimationFrame(drawBall);
}
drawBall();

const worker = new Worker('worker.js');
const workerInput = document.getElementById('worker-input');
const workerStart = document.getElementById('worker-start');
const workerOutput = document.getElementById('worker-output');
workerStart.addEventListener('click', () => {
    const value = parseFloat(workerInput.value);
    if (isNaN(value)) {
        workerOutput.textContent = 'Введите корректное число';
        return;
    }
    worker.postMessage(value);
});
worker.onmessage = (event) => {
    workerOutput.textContent = `Результат: ${event.data}`;
};
worker.onerror = (error) => {
    console.error('Ошибка воркера:', error);
    workerOutput.textContent = 'Произошла ошибка!';
};
