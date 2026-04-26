/* ZAGHET v3.0 - Scripts */
document.addEventListener('DOMContentLoaded', () => {

  // ========== ZAGHET ARCHITECTURAL PATTERN ==========
  // Faithful recreation of the structural beam pattern from
  // the client's facade graphic. Specific angle groups, uniform
  // thick lines, high density mesh — adapts to any element size.
  function drawZaghetPattern(el) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    if (!w || !h) return;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    // Canvas opacity controls subtlety — lines themselves are SOLID
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:0.07;';
    ctx.scale(dpr, dpr);

    // Deterministic seeded random
    let s = 42;
    for (let i = 0; i < (el.className || '').length; i++) s = (s * 31 + el.className.charCodeAt(i)) | 0;
    s = Math.abs(s + Math.round(el.getBoundingClientRect().top * 0.3)) || 1;
    function r() { s = (s * 48271) % 2147483647; return s / 2147483647; }

    // Each angle traced individually from the original facade graphic (degrees → radians)
    // with a small random offset (±3°) per instance for organic feel
    const tracedAngles = [
      5, 12, 18, 25, 8, 15,           // near-horizontal upward
      -6, -14, -10, -20,              // near-horizontal downward
      58, 64, 70, 75, 55, 68, 62,     // steep diagonal ↗
      -52, -60, -67, -73, -56, -65,   // steep diagonal ↘
      33, 40, 48, 35,                 // medium diagonal →
      -28, -38, -45, -32              // medium diagonal ←
    ];

    const diag = Math.sqrt(w * w + h * h);
    const baseThick = diag / 70;
    const deg2rad = Math.PI / 180;
    const jitter = 3 * deg2rad; // ±3 degrees random offset

    ctx.strokeStyle = '#ffffff';
    ctx.lineCap = 'butt';

    tracedAngles.forEach(deg => {
      const angle = deg * deg2rad + (r() - 0.5) * jitter;
      const cx = -w * 0.1 + r() * w * 1.2;
      const cy = -h * 0.1 + r() * h * 1.2;
      const halfLen = diag * 0.9;
      const dx = Math.cos(angle) * halfLen;
      const dy = Math.sin(angle) * halfLen;
      // Uniform thickness with minimal variation like the original
      const thick = baseThick * (0.85 + r() * 0.3);

      ctx.beginPath();
      ctx.moveTo(cx - dx, cy - dy);
      ctx.lineTo(cx + dx, cy + dy);
      ctx.lineWidth = thick;
      ctx.stroke();
    });

    el.style.position = el.style.position || 'relative';
    if (el.firstChild) el.insertBefore(canvas, el.firstChild);
    else el.appendChild(canvas);
  }

  document.querySelectorAll('.geo-pattern, .page-hero').forEach(drawZaghetPattern);

  let patternTimer;
  window.addEventListener('resize', () => {
    clearTimeout(patternTimer);
    patternTimer = setTimeout(() => {
      document.querySelectorAll('.geo-pattern canvas, .page-hero canvas').forEach(c => c.remove());
      document.querySelectorAll('.geo-pattern, .page-hero').forEach(drawZaghetPattern);
    }, 400);
  });

  // ========== NAVBAR ==========
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ========== MOBILE MENU ==========
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ========== REVEAL ANIMATIONS ==========
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('active');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  // ========== COUNTER ANIMATION ==========
  const ease = t => 1 - Math.pow(1 - t, 4);
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    if (isNaN(target)) return;
    const dur = 2200;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      el.textContent = Math.round(ease(p) * target);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('[data-target]').forEach(animateCounter);
        counterObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.stats-section, .stats-grid').forEach(el => counterObs.observe(el));

  // ========== TESTIMONIAL CAROUSEL ==========
  const thumbs = document.querySelectorAll('.tq-thumb');
  const tqText = document.getElementById('tqText');
  const tqName = document.getElementById('tqName');
  const tqAvatar = document.getElementById('tqAvatar');
  if (thumbs.length && tqText) {
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        tqText.textContent = thumb.dataset.text;
        tqName.textContent = thumb.dataset.name;
        tqAvatar.textContent = thumb.dataset.initials;
      });
    });
    let idx = 0;
    setInterval(() => {
      idx = (idx + 1) % thumbs.length;
      thumbs[idx].click();
    }, 6000);
  }

  // ========== GALLERY FILTER ==========
  const filterBtns = document.querySelectorAll('[data-filter]');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => { b.classList.remove('active'); b.classList.add('btn-outline'); });
        btn.classList.add('active');
        btn.classList.remove('btn-outline');
        const filter = btn.dataset.filter;
        document.querySelectorAll('.gallery-item').forEach(item => {
          if (filter === 'tutti' || item.dataset.category === filter || !item.dataset.category) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
});
