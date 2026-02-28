document.addEventListener('DOMContentLoaded', () => {
  const photo = document.querySelector('.candidate-photo');
  const hero = document.querySelector('.hero');
  const maxSize = 280;
  const minSize = 120;
  let ticking = false;

  // Scroll-based photo shrink
  function updatePhotoSize() {
    const scrollY = window.scrollY;
    const heroHeight = hero.offsetHeight;
    const progress = Math.min(scrollY / (heroHeight * 0.6), 1);
    const size = maxSize - (maxSize - minSize) * progress;
    const glowOpacity = 0.25 - 0.2 * progress;

    photo.style.width = size + 'px';
    photo.style.height = size + 'px';
    photo.style.boxShadow = `0 0 50px rgba(253,216,53,${glowOpacity}), 0 0 100px rgba(253,216,53,${glowOpacity * 0.4})`;

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updatePhotoSize);
      ticking = true;
    }
  });

  // Scroll-triggered reveal for sections
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.phase').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.1) + 's';
    observer.observe(el);
  });

  document.querySelectorAll('.project-card').forEach((el, i) => {
    el.style.animationDelay = (i * 0.1) + 's';
    observer.observe(el);
  });

  document.querySelectorAll('.vision-box').forEach(el => {
    observer.observe(el);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
