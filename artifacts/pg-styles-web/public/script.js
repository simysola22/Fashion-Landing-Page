/* =========================================
   PG STYLES — script.js
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── NAVBAR SCROLL BEHAVIOUR ─── */
  const navbar = document.querySelector('.navbar');
  const backToTop = document.querySelector('.back-to-top');

  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
    highlightNavLink();
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ─── ACTIVE NAV LINK ON SCROLL ─── */
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function highlightNavLink() {
    let current = '';
    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top;
      if (top <= 120) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
  }

  /* ─── SMOOTH SCROLL FOR NAV LINKS ─── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile menu if open
        if (mobileMenu.classList.contains('open')) closeMobileMenu();
      }
    });
  });

  /* ─── BACK TO TOP ─── */
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ─── HAMBURGER / MOBILE MENU ─── */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  function closeMobileMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileMenu.addEventListener('click', e => {
    if (e.target === mobileMenu) closeMobileMenu();
  });

  /* ─── RIPPLE EFFECT ON BUTTONS ─── */
  document.querySelectorAll('.btn-primary, .btn-outline, .btn-cta').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });

  /* ─── SCROLL FADE-IN OBSERVER ─── */
  const fadeEls = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  fadeEls.forEach(el => observer.observe(el));

  /* ─── ANIMATED COUNTERS ─── */
  const counters = document.querySelectorAll('.stat-number[data-target]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const tick = () => {
      current += step;
      if (current < target) {
        el.textContent = Math.floor(current) + suffix;
        requestAnimationFrame(tick);
      } else {
        el.textContent = target + suffix;
      }
    };
    requestAnimationFrame(tick);
  }

  /* ─── GALLERY LIGHTBOX ─── */
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = lightbox.querySelector('img');
  const lightboxClose = lightbox.querySelector('.lightbox-close');

  document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeMobileMenu();
    }
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ─── HERO IMAGE PARALLAX ─── */
  const heroFrame = document.querySelector('.hero-image-frame');
  if (heroFrame) {
    window.addEventListener('mousemove', e => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx * 8;
      const dy = (e.clientY - cy) / cy * 5;
      heroFrame.style.transform = `perspective(800px) rotateY(${dx * 0.4}deg) rotateX(${-dy * 0.3}deg)`;
    });

    window.addEventListener('mouseleave', () => {
      heroFrame.style.transform = '';
    });
  }

  /* ─── COLLECTION CARD TILT EFFECT ─── */
  document.querySelectorAll('.collection-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) translateY(-10px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ─── NAVBAR LOGO TEXT ─── */
  // Already handled via HTML

  /* ─── STICKY NAV INITIAL CHECK ─── */
  onScroll();

});
