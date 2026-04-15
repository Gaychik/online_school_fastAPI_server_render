
    document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Animations (Fade In Up)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-delay') || 0;
          setTimeout(() => entry.target.classList.add('visible'), delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

    // 2. Parallax Effect (Desktop only)
    if (window.innerWidth >= 992) {
      const parallaxImg = document.querySelector('.parallax-img');
      if (parallaxImg) {
        window.addEventListener('scroll', () => {
          const section = document.getElementById('section-13');
          const rect = section.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
            parallaxImg.style.transform = `translateY(${scrollPercent * -40}px)`;
          }
        }, { passive: true });
      }
    }
}) ;

