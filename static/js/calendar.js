
// Переключение между классами
document.querySelectorAll('.toggle-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const targetClass = this.dataset.class;
    const toggleGroup = this.closest('.toggle-group'); // ← 1. Находим группу кнопок
    
    // Обновляем кнопки
    document.querySelectorAll('.toggle-btn').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });
    this.classList.add('active');
    this.setAttribute('aria-pressed', 'true');
    
    // ← 2. ОДНА НОВАЯ СТРОКА: двигаем слайдер через data-атрибут
    if (toggleGroup) {
      toggleGroup.setAttribute('data-active-class', targetClass);
    }
    
    // Переключаем календари
    document.querySelectorAll('.calendar').forEach(cal => {
      cal.classList.toggle('active', cal.dataset.class === targetClass);
    });
    
    // Сохраняем выбор в URL
    const url = new URL(window.location);
    url.searchParams.set('class', targetClass);
    window.history.replaceState({}, '', url);
  });
});

// Восстановление класса при загрузке (из URL или localStorage)
document.addEventListener('DOMContentLoaded', () => {
  const urlClass = new URLSearchParams(window.location.search).get('class');
  const savedClass = localStorage.getItem('selected_class') || urlClass || '7';
  
  const targetBtn = document.querySelector(`.toggle-btn[data-class="${savedClass}"]`);
  if (targetBtn) {
    // Триггерим клик, чтобы сработала вся логика переключения
    targetBtn.click();
    // Дополнительно сохраняем в localStorage для будущих визитов
    localStorage.setItem('selected_class', savedClass);
  }
});

function toggleMonth(monthEl) {
  const info = monthEl.nextElementSibling;
  if (!info?.classList.contains('info')) return;
  
  const isOpen = monthEl.classList.contains('open');
  const calendar = monthEl.closest('.calendar');
  
  // 🔥 КЛЮЧЕВОЕ ИСПРАВЛЕНИЕ: если кликнули на уже открытый — закрываем и выходим
  if (isOpen) {
    monthEl.classList.remove('open', 'active');
    info.classList.remove('open', 'active');
    return;
  }
  
  // Закрываем все остальные месяцы в этом календаре
  calendar?.querySelectorAll('.month.open, .month.active').forEach(m => {
    m.classList.remove('open', 'active');
    const sibling = m.nextElementSibling;
    if (sibling?.classList.contains('info')) {
      sibling.classList.remove('open', 'active');
    }
  });
  
  // Открываем текущий месяц
  monthEl.classList.add('open');
  info.classList.add('open');
  
  // Плавный скролл к открытому месяцу на мобильных
  if (window.innerWidth < 768) {
    setTimeout(() => {
      monthEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }
}