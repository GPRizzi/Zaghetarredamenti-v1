/* ZAGHET v3.0 - Scripts with Premium Effects */
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

  // Staggered Reveal
  const applyStaggeredDelays = () => {
    const containers = [
      '.services-grid',
      '.gallery-masonry',
      '.blog-grid',
      '.sedi-grid',
      '.team-grid',
      '.stats-grid',
      '.contact-info',
      '.sede-info-cards'
    ];
    containers.forEach(selector => {
      const container = document.querySelector(selector);
      if (!container) return;
      const items = container.querySelectorAll('.reveal, .ci-card, .sede-info-item');
      items.forEach((item, i) => {
        item.style.transitionDelay = (i * 120) + 'ms';
      });
    });
  };
  applyStaggeredDelays();

  // Reveal with IntersectionObserver
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('active');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  // Counters
  let started = false;
  const ease = t => 1 - Math.pow(1 - t, 4);
  const animate = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const dur = 2000;
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

  // 3D Flip Cards — mobile tap support
  const flipCards = document.querySelectorAll('.flip-card');
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  if (isTouchDevice) {
    flipCards.forEach(card => {
      card.addEventListener('click', (e) => {
        flipCards.forEach(c => {
          if (c !== card) c.classList.remove('flipped');
        });
        card.classList.toggle('flipped');
      });
    });
  }

  // Testimonial carousel with slide/scale animation
  const thumbs = document.querySelectorAll('.tq-thumb');
  const tqText = document.getElementById('tqText');
  const tqName = document.getElementById('tqName');
  const tqAvatar = document.getElementById('tqAvatar');
  const tqMain = document.getElementById('testimonialMain');

  if (thumbs.length && tqText && tqName && tqAvatar) {
    let autoInterval;

    const showTestimonial = (thumb) => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');

      if (tqMain) {
        tqMain.classList.add('tq-animating');
        tqMain.classList.remove('tq-animated');
      }

      tqText.style.opacity = '0';
      tqText.style.transform = 'translateY(8px)';
      tqName.style.opacity = '0';

      setTimeout(() => {
        tqText.innerHTML = thumb.dataset.text;
        tqName.textContent = thumb.dataset.name;
        tqAvatar.textContent = thumb.dataset.initials;

        tqText.style.opacity = '1';
        tqText.style.transform = 'translateY(0)';
        tqName.style.opacity = '1';

        if (tqMain) {
          tqMain.classList.remove('tq-animating');
          tqMain.classList.add('tq-animated');
        }
      }, 250);
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

  // Gallery filter (realizzazioni page) — supports both old btn and new pill filters
  const filterBtns = document.querySelectorAll('[data-filter]');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active from all filter buttons
        filterBtns.forEach(b => {
          b.classList.remove('active', 'btn-accent');
          b.classList.add('btn-outline-dark');
          // For pill style
          if (b.classList.contains('filter-pill')) {
            b.classList.remove('active');
          }
        });
        // Add active to clicked
        btn.classList.remove('btn-outline-dark');
        btn.classList.add('btn-accent', 'active');
        if (btn.classList.contains('filter-pill')) {
          btn.classList.add('active');
        }

        const filter = btn.dataset.filter;
        document.querySelectorAll('.gallery-item').forEach(item => {
          if (filter === 'tutti' || item.dataset.category === filter) {
            item.style.display = '';
            item.style.animation = 'none';
            item.offsetHeight; // trigger reflow
            item.style.animation = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
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

  // Form
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const orig = btn.textContent;
      btn.textContent = 'Messaggio Inviato!';
      btn.style.background = '#2D8B4E';
      btn.style.color = '#fff';
      setTimeout(() => { btn.textContent = orig; btn.style.background = ''; btn.style.color = ''; form.reset(); }, 3000);
    });
  }

  // Parallax on scroll for about images
  const aboutImages = document.querySelector('.about-images');
  if (aboutImages && !isTouchDevice) {
    window.addEventListener('scroll', () => {
      const rect = aboutImages.getBoundingClientRect();
      const scrolled = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      if (scrolled > 0 && scrolled < 1) {
        const mainImg = aboutImages.querySelector('.about-img-main');
        if (mainImg) {
          mainImg.style.transform = `translateY(${(scrolled - 0.5) * -20}px)`;
        }
      }
    }, { passive: true });
  }

  // Contact layout responsive: apply 1/3 + 2/3 split on desktop
  const contactLayout = document.querySelector('.contact-layout');
  if (contactLayout) {
    const applyContactLayout = () => {
      if (window.innerWidth >= 1024) {
        contactLayout.style.gridTemplateColumns = '1fr 2fr';
      } else {
        contactLayout.style.gridTemplateColumns = '1fr';
      }
    };
    applyContactLayout();
    window.addEventListener('resize', applyContactLayout);
  }
});
