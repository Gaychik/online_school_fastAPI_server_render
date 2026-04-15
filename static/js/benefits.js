/* benefits.js - Логика секции "Преимущества" (без Swiper) */
document.addEventListener('DOMContentLoaded', () => {
  
  // ===== CUSTOM MOBILE SLIDER =====
  const track = document.getElementById('benefitsTrack');
  const slides = document.querySelectorAll('.benefits-slider-mobile .slide-item');
  const pagination = document.getElementById('benefitsPagination');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  
  if (track && slides.length > 0) {
    let currentIndex = 0;
    const totalSlides = slides.length;
    
    // Создаём точки пагинации
    slides.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.className = `pagination-dot${index === 0 ? ' active' : ''}`;
      dot.addEventListener('click', () => goToSlide(index));
      pagination?.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.pagination-dot');
    
    function updateSlider() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }
    
    function goToSlide(index) {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      currentIndex = index;
      updateSlider();
    }
    
    prevBtn?.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn?.addEventListener('click', () => goToSlide(currentIndex + 1));
    
    // Свайпы тачем
    let startX = 0;
    let isDragging = false;
    
    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    }, { passive: true });
    
    track.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const currentX = e.touches[0].clientX;
      const diff = startX - currentX;
      
      if (Math.abs(diff) > 50) {
        isDragging = false;
        if (diff > 0) goToSlide(currentIndex + 1);
        else goToSlide(currentIndex - 1);
      }
    }, { passive: true });
    
    track.addEventListener('touchend', () => {
      isDragging = false;
    });
  }
  
  // ===== SCROLL ANIMATIONS FOR CARDS =====
  const cards = document.querySelectorAll('.section-3 .item');
  if ('IntersectionObserver' in window && cards.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    cards.forEach(card => observer.observe(card));
  }
});