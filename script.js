// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  document.getElementById('back-top').classList.toggle('show', window.scrollY > 400);

  // Active nav link
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}, { passive: true });

// Mobile nav
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Reveal on scroll
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), entry.target.dataset.delay || 0);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el, i) => {
  revealObserver.observe(el);
});

// Stagger children
document.querySelectorAll('[data-stagger]').forEach(parent => {
  parent.children && [...parent.children].forEach((child, i) => {
    child.dataset.delay = i * 80;
    child.classList.add('reveal');
    revealObserver.observe(child);
  });
});

// Back to top
document.getElementById('back-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Contact form
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    // Replace with your form handler (Formspree, EmailJS, etc.)
    setTimeout(() => {
      form.style.display = 'none';
      document.getElementById('form-success').style.display = 'block';
    }, 1200);
  });
}

// Typed effect in hero
const titles = ['Cloud Infrastructure Engineer', 'Software Engineer', 'DevOps Engineer', 'Terraform Expert', 'GCP & Azure Specialist'];
let ti = 0, ci = 0, deleting = false;
const typed = document.getElementById('typed-title');
if (typed) {
  function typeLoop() {
    const current = titles[ti];
    if (!deleting) {
      typed.textContent = current.slice(0, ++ci);
      if (ci === current.length) { deleting = true; return setTimeout(typeLoop, 2000); }
    } else {
      typed.textContent = current.slice(0, --ci);
      if (ci === 0) { deleting = false; ti = (ti + 1) % titles.length; }
    }
    setTimeout(typeLoop, deleting ? 40 : 70);
  }
  setTimeout(typeLoop, 800);
}
