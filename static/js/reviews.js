document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('carouselTrack');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.button-prev');
  const nextBtn = document.querySelector('.button-next');
  const pagination = document.getElementById('carouselPagination');
  
  let currentIndex = 0;
  let slidesPerView = getSlidesPerView();
  let isDragging = false;
  let startX = 0;
  let currentX = 0;

  // ===== Утилиты =====
  function getSlidesPerView() {
    if (window.innerWidth <= 640) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  function getMaxIndex() {
    return Math.max(0, slides.length - slidesPerView);
  }

  function updateCarousel() {
    slidesPerView = getSlidesPerView();
    const offset = -currentIndex * (100 / slidesPerView);
    track.style.transform = `translateX(${offset}%)`;
    updatePagination();
  }

  function updatePagination() {
    pagination.innerHTML = '';
    const totalDots = Math.ceil(slides.length / slidesPerView);
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('div');
      dot.className = `pagination-dot ${i === Math.floor(currentIndex / slidesPerView) ? 'active' : ''}`;
      dot.addEventListener('click', () => {
        currentIndex = i * slidesPerView;
        if (currentIndex > getMaxIndex()) currentIndex = getMaxIndex();
        updateCarousel();
      });
      pagination.appendChild(dot);
    }
  }

  // ===== Навигация кнопками =====
  prevBtn?.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  nextBtn?.addEventListener('click', () => {
    if (currentIndex < getMaxIndex()) {
      currentIndex++;
      updateCarousel();
    }
  });

  // ===== Свайп на мобильных =====
  track.addEventListener('touchstart', (e) => {
    if (window.innerWidth > 640) return; // отключаем свайп на десктопе, если нужно
    isDragging = true;
    startX = e.touches[0].clientX;
    track.style.transition = 'none';
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    const percentDiff = (diff / track.offsetWidth) * 100;
    const baseOffset = -currentIndex * (100 / slidesPerView);
    track.style.transform = `translateX(${baseOffset + percentDiff}%)`;
  }, { passive: true });

  track.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)';
    
    const diff = currentX - startX;
    const threshold = 50; // мин. расстояние для свайпа
    
    if (diff > threshold && currentIndex > 0) {
      currentIndex--;
    } else if (diff < -threshold && currentIndex < getMaxIndex()) {
      currentIndex++;
    }
    updateCarousel();
  });

  // ===== Раскрытие отзывов =====
  function setupToggles() {
    document.querySelectorAll('.text-toggle').forEach(btn => {
      const slide = btn.closest('.carousel-slide');
      const text = slide.querySelector('.text');
      
      // Проверяем, есть ли переполнение
      const hasOverflow = text.scrollHeight > text.clientHeight;
      
      if (hasOverflow) {
        btn.classList.add('visible');
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const isExpanded = slide.classList.toggle('is-expanded');
          btn.textContent = isExpanded ? 'Свернуть отзыв' : 'Читать весь отзыв';
          btn.setAttribute('aria-expanded', isExpanded);
        });
      } else {
        btn.remove(); // убираем кнопку, если текст короткий
      }
    });
  }

  // ===== Инициализация =====
  function init() {
    setupToggles();
    updatePagination();
    updateCarousel();
    
    // Пересчитываем при ресайзе
    window.addEventListener('resize', () => {
      slidesPerView = getSlidesPerView();
      if (currentIndex > getMaxIndex()) currentIndex = getMaxIndex();
      updateCarousel();
    });
  }

  init();
});