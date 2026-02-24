/* =============================================
   WEEKLY ACTIVITIES CLUB — JAVASCRIPT
   ============================================= */

// ── NAVBAR SCROLL ──────────────────────────────
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
    backToTop.classList.add('visible');
  } else {
    navbar.classList.remove('scrolled');
    backToTop.classList.remove('visible');
  }

  // Active nav link highlight
  const sections = document.querySelectorAll('section[id]');
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    const bottom = top + sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      if (window.scrollY >= top && window.scrollY < bottom) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
});

// ── BACK TO TOP ─────────────────────────────────
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── HAMBURGER MENU ──────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ── COUNTER ANIMATION ───────────────────────────
function animateCounters() {
  document.querySelectorAll('.stat-number').forEach(el => {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 1800;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }
    requestAnimationFrame(update);
  });
}

let countersRun = false;
const heroSection = document.querySelector('.hero');
const counterObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !countersRun) {
    countersRun = true;
    animateCounters();
  }
}, { threshold: 0.3 });
if (heroSection) counterObserver.observe(heroSection);

// ── SCROLL REVEAL ───────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.activity-card, .schedule-day, .testimonial-card, .plan-card, .gallery-item, .contact-item, .week-card').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 6) * 0.08}s`;
  revealObserver.observe(el);
});

// ── TOAST NOTIFICATION ──────────────────────────
function showToast(message, icon = '✅') {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMessage');
  const toastIcon = toast.querySelector('.toast-icon');
  toastMsg.textContent = message;
  toastIcon.textContent = icon;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// ── CONTACT FORM ────────────────────────────────
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('contactSubmit');
    btn.innerHTML = '<span>Sending...</span>';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = '<span>Send Message</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>';
      btn.disabled = false;
      contactForm.reset();
      showToast('Message sent! We\'ll be in touch within 24 hours. 🎉');
    }, 1600);
  });
}

// ── NEWSLETTER FORM ─────────────────────────────
const newsletterBtn = document.getElementById('newsletter-btn');
if (newsletterBtn) {
  newsletterBtn.addEventListener('click', () => {
    const input = document.getElementById('newsletter-email');
    if (input.value && input.value.includes('@')) {
      input.value = '';
      showToast('You\'re subscribed! Welcome to the club 🌟');
    } else {
      showToast('Please enter a valid email address.', '⚠️');
    }
  });
}

// ── JOIN MODAL ──────────────────────────────────
function openJoinModal(plan) {
  document.getElementById('modalPlanName').textContent = plan;
  document.getElementById('joinModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeJoinModal() {
  document.getElementById('joinModal').classList.remove('active');
  document.body.style.overflow = '';
}

// Close modal on overlay click
document.getElementById('joinModal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeJoinModal();
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeJoinModal();
});

// Join form submit
const joinForm = document.getElementById('joinForm');
if (joinForm) {
  joinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = joinForm.querySelector('button[type="submit"]');
    const plan = document.getElementById('modalPlanName').textContent;
    btn.innerHTML = '<span>Processing...</span>';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = '<span>Complete Registration</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
      btn.disabled = false;
      closeJoinModal();
      joinForm.reset();
      showToast(`Welcome aboard! Your ${plan} membership is confirmed 🎊`);
    }, 1800);
  });
}

// ── WEEK CARD TABS ──────────────────────────────
const weekCards = document.querySelectorAll('.week-card');
weekCards.forEach(card => {
  card.addEventListener('click', () => {
    weekCards.forEach(c => c.classList.remove('active-week'));
    card.classList.add('active-week');
  });
});

// ── SMOOTH SCROLL for all anchor links ──────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── GALLERY ITEM HOVER EFFECT ───────────────────
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.zIndex = '10';
  });
  item.addEventListener('mouseleave', () => {
    item.style.zIndex = 'auto';
  });
});

// Make modal fns global
window.openJoinModal = openJoinModal;
window.closeJoinModal = closeJoinModal;
