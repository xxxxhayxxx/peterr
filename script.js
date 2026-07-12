/* =========================================
   $PETER — script.js
   ========================================= */

// ---------- Copy Contract Address ----------
const FAKE_CA = "Neve1r1and69Fairy420MoonPumpxYZPk";

function copyCA() {
  const btn = document.getElementById('copyBtn');
  const success = document.getElementById('copySuccess');
  const copyTextEl = btn.querySelector('.copy-text');

  const writeFallback = () => {
    const textarea = document.createElement('textarea');
    textarea.value = FAKE_CA;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(textarea);
  };

  const showSuccess = () => {
    btn.classList.add('copied');
    copyTextEl.textContent = 'Copied!';
    success.classList.add('show');

    setTimeout(() => {
      btn.classList.remove('copied');
      copyTextEl.textContent = 'Copy';
      success.classList.remove('show');
    }, 2000);
  };

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(FAKE_CA).then(showSuccess).catch(() => {
      writeFallback();
      showSuccess();
    });
  } else {
    writeFallback();
    showSuccess();
  }
}

// ---------- Fake live price ticker ----------
(function priceTicker() {
  const priceEl = document.getElementById('priceValue');
  const changeEl = document.getElementById('priceChange');
  if (!priceEl) return;

  let base = 0.000042;

  function tick() {
    const wobble = (Math.random() - 0.42) * 0.000004;
    base = Math.max(0.000010, base + wobble);
    priceEl.textContent = '$' + base.toFixed(6);

    const changeVal = ((base - 0.000042) / 0.000042) * 100;
    const up = changeVal >= 0;
    changeEl.textContent = (up ? '▲ ' : '▼ ') + Math.abs(changeVal).toFixed(1) + '%';
    changeEl.style.color = up ? '#2ecc71' : '#ff5c5c';
  }

  setInterval(tick, 2200);
})();

// ---------- Pixie dust particle canvas ----------
(function pixieDust() {
  const canvas = document.getElementById('pixie-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight * (document.body.scrollHeight / window.innerHeight > 1 ? 1 : 1);
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const colors = ['#FFD700', '#2ecc71', '#ffffff'];

  function createParticle() {
    return {
      x: Math.random() * w,
      y: h + 10,
      r: Math.random() * 2 + 0.6,
      speed: Math.random() * 0.6 + 0.15,
      drift: (Math.random() - 0.5) * 0.4,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.6 + 0.2,
      twinkle: Math.random() * 0.02 + 0.01
    };
  }

  const PARTICLE_COUNT = 60;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = createParticle();
    p.y = Math.random() * h; // spread initially
    particles.push(p);
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.y -= p.speed;
      p.x += p.drift;
      p.alpha += (Math.random() - 0.5) * p.twinkle;
      p.alpha = Math.max(0.1, Math.min(0.9, p.alpha));

      if (p.y < -10) {
        Object.assign(p, createParticle());
        p.y = h + 10;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.shadowBlur = 8;
      ctx.shadowColor = p.color;
      ctx.fill();
      ctx.globalAlpha = 1;
    });
    requestAnimationFrame(animate);
  }
  animate();
})();

// ---------- Scroll reveal for feature/map cards ----------
(function scrollReveal() {
  const targets = document.querySelectorAll('.glass-card, .map-point');
  if (!('IntersectionObserver' in window) || targets.length === 0) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(t => io.observe(t));
})();

// ---------- Smooth active nav on scroll (subtle enhancement) ----------
(function navShadowOnScroll() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.35)';
    } else {
      nav.style.boxShadow = 'none';
    }
  });
})();
