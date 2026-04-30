/* ZAGHET — Sito Definitivo Scripts */
document.addEventListener('DOMContentLoaded', () => {

  // ========== ZAGHET ARCHITECTURAL PATTERN ==========
  // Two modes:
  //  - "cutout" (hero): dark fill, lines are CUT OUT so video shows through
  //  - "overlay" (other sections): subtle white lines on transparent bg
  function drawZaghetPattern(el) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    if (!w || !h) return;

    canvas.width = w * dpr;
    canvas.height = h * dpr;

    const isCutout = el.classList.contains('hero-card-lines');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;'
      + (isCutout ? '' : 'opacity:0.07;');
    ctx.scale(dpr, dpr);

    // Deterministic seeded random
    let s = 42;
    for (let i = 0; i < (el.className || '').length; i++) s = (s * 31 + el.className.charCodeAt(i)) | 0;
    s = Math.abs(s + Math.round(el.getBoundingClientRect().top * 0.3)) || 1;
    function r() { s = (s * 48271) % 2147483647; return s / 2147483647; }

    const diag = Math.sqrt(w * w + h * h);
    const unit = diag / 800;
    const deg = Math.PI / 180;

    // Cutout mode: thicker lines that become transparent windows
    const thickMult = isCutout ? 1.4 : 1;
    const THIN = unit * 4 * thickMult;
    const MED  = unit * 8 * thickMult;
    const THICK = unit * 13 * thickMult;

    const groups = [
      { angle: 10,  count: isCutout ? 5 : 6 },
      { angle: -12, count: isCutout ? 4 : 5 },
      { angle: 63,  count: isCutout ? 5 : 6 },
      { angle: -60, count: isCutout ? 5 : 6 },
      { angle: 40,  count: isCutout ? 4 : 5 },
      { angle: -38, count: isCutout ? 4 : 4 },
    ];

    const thicknesses = [THIN, MED, MED, MED, THICK];

    if (isCutout) {
      // HERO LINES MODE: just the lines, no background fill
      // Less contrast — closer to background color
      ctx.strokeStyle = '#343434';
    } else {
      // OVERLAY MODE: subtle white lines on transparent
      ctx.strokeStyle = '#ffffff';
    }
    ctx.lineCap = 'butt';

    groups.forEach(g => {
      const baseAngle = g.angle * deg;
      const perpX = -Math.sin(baseAngle);
      const perpY =  Math.cos(baseAngle);
      const span = Math.abs(perpX * w) + Math.abs(perpY * h);
      const step = span / (g.count + 1);
      const originX = w / 2 - perpX * span / 2;
      const originY = h / 2 - perpY * span / 2;

      for (let i = 1; i <= g.count; i++) {
        const offset = step * i + (r() - 0.5) * step * 0.15;
        const cx = originX + perpX * offset;
        const cy = originY + perpY * offset;
        const a = baseAngle + (r() - 0.5) * 6 * deg;
        const halfLen = diag;
        const dx = Math.cos(a) * halfLen;
        const dy = Math.sin(a) * halfLen;
        const thick = thicknesses[Math.floor(r() * thicknesses.length)];

        ctx.beginPath();
        ctx.moveTo(cx - dx, cy - dy);
        ctx.lineTo(cx + dx, cy + dy);
        ctx.lineWidth = Math.max(1, thick);
        ctx.stroke();
      }
    });

    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';

    // Only set position if the element doesn't already have one from CSS
    const computed = window.getComputedStyle(el).position;
    if (computed === 'static') el.style.position = 'relative';

    if (el.firstChild) el.insertBefore(canvas, el.firstChild);
    else el.appendChild(canvas);
  }

  // Apply pattern to all elements with these classes
  document.querySelectorAll('.geo-pattern, .page-hero, .hero-card-lines').forEach(drawZaghetPattern);

  let patternTimer;
  window.addEventListener('resize', () => {
    clearTimeout(patternTimer);
    patternTimer = setTimeout(() => {
      document.querySelectorAll('.geo-pattern canvas, .page-hero canvas, .hero-card-lines canvas').forEach(c => c.remove());
      document.querySelectorAll('.geo-pattern, .page-hero, .hero-card-lines').forEach(drawZaghetPattern);
    }, 400);
  });

  // ========== HERO SCROLL: sequenced dissolve ==========
  // Phase 1 (0-30%): background darkens and fades
  // Phase 2 (20-50%): pattern lines dissolve and blur
  // Phase 3 (35-65%): logo zooms in slightly and fades out
  // Phase 4 (55-85%): video text fades in with scale
  const heroWrap = document.querySelector('.hero-wrap');
  const heroCard = document.getElementById('heroCard');
  const heroCardDark = document.getElementById('heroCardDark');
  const heroCardLines = document.getElementById('heroCardLines');
  const heroCardContent = document.getElementById('heroCardContent');
  const heroScrollInd = document.getElementById('heroScroll');
  const heroVideoText = document.getElementById('heroVideoText');
  if (heroWrap && heroCard) {
    const ease = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const onHeroScroll = () => {
      const rect = heroWrap.getBoundingClientRect();
      const scrolled = -rect.top;
      const total = heroWrap.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrolled / total));

      // PHASE 1: Dark background fades away (0% → 30%)
      // Video starts to peek through between the lines
      if (heroCardDark) {
        const darkPhase = ease(Math.max(0, Math.min(1, progress / 0.30)));
        heroCardDark.style.opacity = 1 - darkPhase;
      }

      // PHASE 2: Pattern lines zoom in + fade (20% → 55%)
      if (heroCardLines) {
        const linesPhase = ease(Math.max(0, Math.min(1, (progress - 0.20) / 0.35)));
        const lineScale = 1 + linesPhase * 0.4;
        heroCardLines.style.opacity = 1 - linesPhase;
        heroCardLines.style.transform = `scale(${lineScale})`;
      }

      // PHASE 3: Logo zooms in + fades (starts slightly before pattern ends: 35% → 65%)
      if (heroCardContent) {
        // Remove CSS animation so JS can control transform
        heroCardContent.style.animation = 'none';
        const logoPhase = ease(Math.max(0, Math.min(1, (progress - 0.35) / 0.30)));
        const logoScale = 1 + logoPhase * 0.35;
        heroCardContent.style.opacity = progress < 0.35 ? 1 : 1 - logoPhase;
        heroCardContent.style.transform = progress < 0.35 ? 'scale(1)' : `scale(${logoScale})`;
      }

      // Hide card layer completely when done
      heroCard.style.pointerEvents = progress > 0.7 ? 'none' : '';
      heroCard.style.visibility = progress > 0.75 ? 'hidden' : 'visible';

      // Scroll indicator fades out early
      if (heroScrollInd) {
        heroScrollInd.style.opacity = 1 - Math.min(1, progress / 0.15);
      }

      // PHASE 4: Video text appears (60% → 85%)
      if (heroVideoText) {
        const textPhase = ease(Math.max(0, Math.min(1, (progress - 0.60) / 0.25)));
        heroVideoText.style.opacity = textPhase;
        heroVideoText.style.transform = `translateY(${(1 - textPhase) * 30}px)`;
      }
    };
    window.addEventListener('scroll', onHeroScroll, { passive: true });
    onHeroScroll();
  }

  // ========== NAVBAR ==========
  const navbar = document.getElementById('navbar');
  if (navbar) {
    // Only toggle scrolled state on home page (has hero-wrap)
    // On subpages, navbar stays always scrolled
    const isHomePage = !!document.querySelector('.hero-wrap');
    if (isHomePage) {
      const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 60);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
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

  // ========== NAV DROPDOWN ==========
  // The toggle arrow opens/closes the submenu
  // The link itself always navigates to the main page
  document.querySelectorAll('.nav-dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const dropdown = toggle.closest('.nav-dropdown');
      // Close other open dropdowns
      document.querySelectorAll('.nav-dropdown.open').forEach(d => {
        if (d !== dropdown) d.classList.remove('open');
      });
      dropdown.classList.toggle('open');
    });
  });

  // ========== REVEAL ANIMATIONS ==========
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('active');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => revealObs.observe(el));

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

  // ========== FLIP CARDS (mobile tap) ==========
  document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('flipped'));
  });

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
