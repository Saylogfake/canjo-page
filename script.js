// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const stickyCta = document.querySelector('.sticky-cta');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
    stickyCta.classList.add('visible');
  } else {
    navbar.classList.remove('scrolled');
    stickyCta.classList.remove('visible');
  }
});

// ===== MOBILE NAV =====
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== AOS (Animate On Scroll) =====
const aosElements = document.querySelectorAll('[data-aos]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.aosDelay || 0;
      setTimeout(() => entry.target.classList.add('aos-animate'), parseInt(delay));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

aosElements.forEach(el => observer.observe(el));

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ===== FORM SUBMIT -> WHATSAPP =====
document.getElementById('form').addEventListener('submit', function(e) {
  e.preventDefault();

  const nombre  = document.getElementById('nombre').value.trim();
  const email   = document.getElementById('email').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const empresa = document.getElementById('empresa').value.trim();

  const mensaje =
    `Hola, quiero solicitar un presupuesto.%0A%0A` +
    `*Nombre:* ${encodeURIComponent(nombre)}%0A` +
    `*Email:* ${encodeURIComponent(email)}%0A` +
    (telefono ? `*Teléfono:* ${encodeURIComponent(telefono)}%0A` : '') +
    (empresa  ? `*Empresa:* ${encodeURIComponent(empresa)}%0A`  : '');

  const numero = '595976917543';
  window.open(`https://wa.me/${numero}?text=${mensaje}`, '_blank');
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return; // skip logo link
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== CAROUSEL =====
(function() {
  const track  = document.getElementById('carouselTrack');
  const prev   = document.getElementById('prevBtn');
  const next   = document.getElementById('nextBtn');
  const dotsEl = document.getElementById('carouselDots');
  if (!track) return;

  const cards = track.querySelectorAll('.product-card');
  let current = 0;
  const total = cards.length;

  // build dots
  cards.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(d);
  });

  function goTo(idx) {
    current = idx;
    const cardW = cards[0].offsetWidth + 24; // width + gap
    track.style.transform = `translateX(-${current * cardW}px)`;
    dotsEl.querySelectorAll('.carousel-dot').forEach((d, i) =>
      d.classList.toggle('active', i === current));
    prev.disabled = current === 0;
    next.disabled = current === total - 1;
  }

  prev.addEventListener('click', () => { if (current > 0) goTo(current - 1); });
  next.addEventListener('click', () => { if (current < total - 1) goTo(current + 1); });

  goTo(0);

  // recalculate on resize
  window.addEventListener('resize', () => goTo(current));
})();
