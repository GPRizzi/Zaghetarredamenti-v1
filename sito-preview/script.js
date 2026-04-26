/* ZAGHET v2.0 - Scripts with Premium Animations */
document.addEventListener('DOMContentLoaded', () => {

  // Navbar
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile menu
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

  // Reveal animations (supports .reveal, .reveal-scale, .reveal-rotate)
  const revealSelectors = '.reveal, .reveal-scale, .reveal-rotate';
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('active');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll(revealSelectors).forEach(el => revealObs.observe(el));

  // Counters
  let started = false;
  const ease = t => 1 - Math.pow(1 - t, 4);
  const animate = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const dur = 2200;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      el.textContent = Math.round(ease(p) * target).toLocaleString('it-IT');
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const statsObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !started) {
        started = true;
        document.querySelectorAll('.stat-number').forEach(animate);
        statsObs.disconnect();
      }
    });
  }, { threshold: 0.3 });
  const statsEl = document.querySelector('.stats-parallax') || document.querySelector('.stats');
  if (statsEl) statsObs.observe(statsEl);

  // Testimonial carousel
  const thumbs = document.querySelectorAll('.tq-thumb');
  const tqText = document.getElementById('tqText');
  const tqName = document.getElementById('tqName');
  const tqAvatar = document.getElementById('tqAvatar');

  if (thumbs.length && tqText && tqName && tqAvatar) {
    let autoInterval;

    const showTestimonial = (thumb) => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      tqText.style.opacity = '0';
      tqName.style.opacity = '0';
      setTimeout(() => {
        tqText.innerHTML = thumb.dataset.text;
        tqName.textContent = thumb.dataset.name;
        tqAvatar.textContent = thumb.dataset.initials;
        tqText.style.opacity = '1';
        tqName.style.opacity = '1';
      }, 200);
    };

    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        showTestimonial(thumb);
        clearInterval(autoInterval);
        startAutoPlay();
      });
    });

    const startAutoPlay = () => {
      autoInterval = setInterval(() => {
        const current = document.querySelector('.tq-thumb.active');
        const next = current.nextElementSibling || thumbs[0];
        showTestimonial(next);
      }, 5000);
    };
    startAutoPlay();
  }

  // 3D Flip Cards - mobile tap support
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  if (isTouchDevice) {
    document.querySelectorAll('.flip-card').forEach(card => {
      card.addEventListener('click', (e) => {
        // Close other open cards
        document.querySelectorAll('.flip-card.flipped').forEach(other => {
          if (other !== card) other.classList.remove('flipped');
        });
        card.classList.toggle('flipped');
      });
    });
  }

  // Parallax on about-image (subtle vertical movement on scroll)
  const aboutImage = document.getElementById('aboutImage');
  if (aboutImage && !isTouchDevice) {
    const img = aboutImage.querySelector('img');
    if (img) {
      let ticking = false;
      window.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            const rect = aboutImage.getBoundingClientRect();
            const windowH = window.innerHeight;
            // Only apply when element is in viewport
            if (rect.top < windowH && rect.bottom > 0) {
              const progress = (windowH - rect.top) / (windowH + rect.height);
              const offset = (progress - 0.5) * 30; // max 15px movement
              img.style.transform = `translateY(${offset}px)`;
            }
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
    }
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id === '#' || id.length <= 1) return;
      const t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      const offset = navbar ? navbar.offsetHeight : 0;
      window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    });
  });

  // Gallery filter buttons (pill style)
  const filterBtns = document.querySelectorAll('[data-filter]');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        // Update active state
        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.classList.remove('btn-red');
          if (!b.classList.contains('btn-outline-dark')) b.classList.add('btn-outline-dark');
        });
        btn.classList.add('active');
        btn.classList.add('btn-red');
        btn.classList.remove('btn-outline-dark');

        // Filter gallery items
        const items = document.querySelectorAll('.gallery-item[data-category]');
        items.forEach(item => {
          if (filter === 'tutti' || item.dataset.category === filter) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  }

  // Blog card tilt effect (mouse-based perspective)
  const blogCards = document.querySelectorAll('.blog-card');
  if (!isTouchDevice && blogCards.length) {
    blogCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.classList.add('tilt-active');
      });
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4; // max 4deg
        const rotateY = ((x - centerX) / centerX) * 4;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.classList.remove('tilt-active');
        card.style.transform = '';
      });
    });
  }

  // Form
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check" style="margin-right:8px"></i> Messaggio Inviato!';
      btn.style.background = '#2D8B4E';
      setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; form.reset(); }, 3000);
    });
  }
});
