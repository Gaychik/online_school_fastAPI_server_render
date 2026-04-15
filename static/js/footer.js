document.addEventListener('DOMContentLoaded', () => {
  // Плавное появление карточек при скролле
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Задержка для эффекта "волны" (0ms, 150ms, 300ms)
        setTimeout(() => entry.target.classList.add('is-visible'), i * 150);
        observer.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.15, 
    rootMargin: '0px 0px -40px 0px' 
  });

  document.querySelectorAll('.footer-col').forEach(el => observer.observe(el));
});