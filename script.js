// Toggle modo claro / escuro
const toggleBtn = document.getElementById('toggleThemeBtn');
const htmlElement = document.documentElement;

function updateButtonIcon() {
  if (htmlElement.classList.contains('dark')) {
    toggleBtn.classList.remove('sun');
    toggleBtn.classList.add('moon');
    toggleBtn.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/>
      </svg>
    `;
  } else {
    toggleBtn.classList.remove('moon');
    toggleBtn.classList.add('sun');
    toggleBtn.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    `;
  }
}

toggleBtn.addEventListener('click', () => {
  if (htmlElement.classList.contains('dark')) {
    htmlElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    htmlElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
  updateButtonIcon();
});

window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    htmlElement.classList.remove('dark');
  } else {
    htmlElement.classList.add('dark');
  }
  updateButtonIcon();
});

// DNA Partículas
const canvas = document.getElementById('dna-canvas');
const ctx = canvas.getContext('2d');

let width, height;
function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
resize();
window.addEventListener('resize', resize);

class Particle {
  constructor(x, y, radius, speed, phase, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
    this.phase = phase;
    this.color = color;
  }

  update(time) {
    this.y += this.speed;
    if (this.y > height + this.radius) this.y = -this.radius;
    this.x += Math.sin(this.phase + time * 0.002) * 0.5;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 4;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

const particles = [];
const colors = ['#90e0ef', '#0077b6', '#00b4d8', '#48cae4', '#90e0ef'];

for (let i = 0; i < 120; i++) {
  const x = Math.random() * width;
  const y = Math.random() * height;
  const radius = 2 + Math.random() * 2;
  const speed = 0.5 + Math.random();
  const phase = Math.random() * Math.PI * 2;
  const color = colors[Math.floor(Math.random() * colors.length)];
  particles.push(new Particle(x, y, radius, speed, phase, color));
}

function animate(time) {
  ctx.clearRect(0, 0, width, height);
  particles.forEach(p => {
    p.update(time);
    p.draw(ctx);
  });
  requestAnimationFrame(animate);
}
animate();
