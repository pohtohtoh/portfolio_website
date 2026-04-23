const root = document.documentElement;
const dot = document.querySelector('.cursor--dot');
const ring = document.querySelector('.cursor--ring');
const scene = document.getElementById('scene');
const magnetics = document.querySelectorAll('.magnetic');
const interactives = document.querySelectorAll('.interactive, .magnetic, .morph-title');

const ringPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const targetPos = { x: ringPos.x, y: ringPos.y };

const setCursorPosition = (x, y) => {
  if (!dot || !ring) return;
  dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
  targetPos.x = x;
  targetPos.y = y;
  root.style.setProperty('--x', `${x}px`);
  root.style.setProperty('--y', `${y}px`);

  if (scene) {
    const px = (x / window.innerWidth - 0.5) * 14;
    const py = (y / window.innerHeight - 0.5) * -14;
    scene.style.transform = `rotateX(${py}deg) rotateY(${px}deg)`;
  }
};

const animateRing = () => {
  ringPos.x += (targetPos.x - ringPos.x) * 0.25;
  ringPos.y += (targetPos.y - ringPos.y) * 0.25;
  if (ring) {
    ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%)`;
  }
  requestAnimationFrame(animateRing);
};
animateRing();

window.addEventListener('pointermove', (event) => {
  setCursorPosition(event.clientX, event.clientY);
});

interactives.forEach((node) => {
  node.addEventListener('mouseenter', () => ring?.classList.add('active'));
  node.addEventListener('mouseleave', () => ring?.classList.remove('active'));
});

magnetics.forEach((node) => {
  node.addEventListener('pointermove', (event) => {
    const rect = node.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    node.style.transform = `translate(${dx * 0.12}px, ${dy * 0.12}px)`;
  });

  node.addEventListener('mouseleave', () => {
    node.style.transform = 'translate(0, 0)';
  });
});
