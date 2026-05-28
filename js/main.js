/**
 * TECNOVATEC — Main JavaScript
 * Enterprise-grade vanilla JS: performant, accessible, minimal.
 * @version 2.0.0
 */

(function () {
  'use strict';

  /* ============================================================
     1. Utils
     ============================================================ */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const debounce = (fn, wait = 100) => {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(null, args), wait);
    };
  };

  /* ============================================================
     2. Header scroll behavior
     ============================================================ */
  const header = $('#site-header');
  let lastScrollY = 0;

  function updateHeader() {
    const y = window.scrollY;
    if (y > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScrollY = y;
  }

  window.addEventListener('scroll', debounce(updateHeader, 10), { passive: true });
  updateHeader();

  /* ============================================================
     3. Mobile menu
     ============================================================ */
  const menuToggle = $('#menu-toggle');
  const mainNav = $('#main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      mainNav.classList.toggle('mobile-open', !expanded);
      document.body.style.overflow = expanded ? '' : 'hidden';
    });

    $$('.nav-link', mainNav).forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('mobile-open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ============================================================
     4. Scroll-triggered animations (Intersection Observer)
     ============================================================ */
  const animObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-visible');
          animObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  $$('[data-animate]').forEach(el => animObserver.observe(el));

  /* ============================================================
     5. Animated counters
     ============================================================ */
  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const duration = 2000;
          const start = performance.now();

          const tick = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4); // easeOutQuart
            el.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
          countObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  $$('.stat-number[data-count]').forEach(el => countObserver.observe(el));

  /* ============================================================
     6. Particle canvas (hero background)
     ============================================================ */
  const canvas = $('#particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let w, h;
    let rafId;
    let isActive = true;

    const PARTICLE_COUNT = window.matchMedia('(pointer: coarse)').matches ? 30 : 60;
    const CONNECTION_DIST = 120;
    const MAX_CONNECTIONS = 3;

    class Particle {
      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.5 + 0.5;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 212, 255, 0.4)';
        ctx.fill();
      }
    }

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
      }
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        let connections = 0;
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const opacity = (1 - dist / CONNECTION_DIST) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            connections++;
            if (connections >= MAX_CONNECTIONS) break;
          }
        }
      }
    }

    function animate() {
      if (!isActive) return;
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      drawConnections();
      rafId = requestAnimationFrame(animate);
    }

    resize();
    initParticles();
    animate();

    window.addEventListener('resize', debounce(() => {
      resize();
      initParticles();
    }, 200));

    // Visibility API to pause when tab hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        isActive = false;
        cancelAnimationFrame(rafId);
      } else {
        isActive = true;
        animate();
      }
    });
  }

  /* ============================================================
     7. Smooth scroll for anchor links
     ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = header ? header.offsetHeight + 20 : 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ============================================================
     8. Current year in footer
     ============================================================ */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ============================================================
     9. Form handling (no backend — shows message)
     ============================================================ */
  const contactForm = $('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = this.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;

      // Simple validation
      const name = $('#name', this);
      const email = $('#email', this);
      const company = $('#company', this);
      const service = $('#service', this);
      const message = $('#message', this);
      let valid = true;

      [name, email, company, service, message].forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = '#ef4444';
          valid = false;
        } else {
          field.style.borderColor = '';
        }
      });

      if (!valid) {
        btn.textContent = 'Complete los campos requeridos';
        btn.style.background = '#ef4444';
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.background = '';
        }, 2000);
        return;
      }

      btn.innerHTML = '¡Mensaje enviado!';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        this.reset();
      }, 3000);
    });
  }

  /* ============================================================
     10. Keyboard accessibility: close mobile nav on Escape
     ============================================================ */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav && mainNav.classList.contains('mobile-open')) {
      menuToggle.setAttribute('aria-expanded', 'false');
      mainNav.classList.remove('mobile-open');
      document.body.style.overflow = '';
      menuToggle.focus();
    }
  });
})();
