// ===============================================================
// NAGADINESH S – PORTFOLIO JAVASCRIPT
// Handles: nav active, scroll effects, AOS, skill bar animations
// ===============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* -------- NAVBAR SCROLL EFFECT -------- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  /* -------- MOBILE NAV TOGGLE -------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  // Close menu when a link is clicked
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  /* -------- ACTIVE NAV LINK ON SCROLL -------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');

  const updateActiveLink = () => {
    let found = false;
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (!found && rect.top <= 100 && rect.bottom > 100) {
        const id = section.getAttribute('id');
        navLinkEls.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
        found = true;
      }
    });
  };
  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  /* -------- AOS (ANIMATE ON SCROLL) -------- */
  const aosElements = document.querySelectorAll('[data-aos]');
  const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-delay') || 0;
        setTimeout(() => {
          entry.target.classList.add('aos-visible');
        }, parseInt(delay));
        aosObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  aosElements.forEach(el => aosObserver.observe(el));

  /* -------- SKILL BAR ANIMATION -------- */
  const skillFills = document.querySelectorAll('.skill-fill');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('animated'), 200);
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  skillFills.forEach(el => skillObserver.observe(el));

  /* -------- SMOOTH PARALLAX FOR HERO GLOWS -------- */
  const heroSection = document.getElementById('home');
  if (heroSection) {
    document.addEventListener('mousemove', (e) => {
      if (window.innerWidth < 768) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      const glowLeft = heroSection.querySelector('.glow-left');
      const glowRight = heroSection.querySelector('.glow-right');
      if (glowLeft) glowLeft.style.transform = `translateY(-50%) translate(${x}px, ${y}px)`;
      if (glowRight) glowRight.style.transform = `translate(${-x}px, ${-y}px)`;
    });
  }

  /* -------- FLOATING ICON PARALLAX -------- */
  document.addEventListener('mousemove', (e) => {
    if (window.innerWidth < 768) return;
    const icons = document.querySelectorAll('.tool-icon');
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    icons.forEach((icon, i) => {
      const depth = 0.02 + (i % 3) * 0.01;
      const dx = (e.clientX - cx) * depth;
      const dy = (e.clientY - cy) * depth;
      icon.style.marginLeft = `${dx}px`;
      icon.style.marginTop = `${dy}px`;
    });
  });

  /* -------- CURSOR GLOW -------- */
  const cursorGlow = document.createElement('div');
  cursorGlow.className = 'cursor-glow';
  cursorGlow.style.cssText = `
    position: fixed;
    width: 350px;
    height: 350px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(7, 73, 87, 0.29) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: left 0.15s ease, top 0.15s ease;
    will-change: left, top;
  `;
  document.body.appendChild(cursorGlow);

  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  });

  /* -------- TYPING ANIMATION FOR HERO (optional) -------- */
  const heroQuote = document.querySelector('.hero-quote');
  if (heroQuote) {
    const text = heroQuote.textContent;
    heroQuote.textContent = '';
    heroQuote.style.opacity = '1';
    heroQuote.style.animation = 'none';
    
    let i = 0;
    const type = () => {
      if (i < text.length) {
        heroQuote.textContent += text[i++];
        setTimeout(type, 38);
      }
    };
    setTimeout(type, 1200);
  }

  /* -------- PROJECT CARD TILT -------- */
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
      card.style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  });

  /* -------- SECTION REVEAL ON LOAD -------- */
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
  });

});
