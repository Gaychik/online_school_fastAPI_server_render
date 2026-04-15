// Функция открытия попапа (добавьте в ваш JS)
function openPopup(popupId) {
  const popup = document.getElementById(`popup-${popupId}`);
  if (!popup) return;
  
  popup.classList.add('active');
  document.body.style.overflow = 'hidden'; // блокируем скролл фона
  
  // ✅ Микро-анимация: фокус на первое поле формы
  setTimeout(() => {
    const firstInput = popup.querySelector('input:not([type="hidden"])');
    if (firstInput) firstInput.focus();
  }, 400);
}

// Функция закрытия
function closePopup(popupId) {
  const popup = document.getElementById(`popup-${popupId}`);
  if (!popup) return;
  
  popup.classList.remove('active');
  document.body.style.overflow = '';
  
  // Сброс формы через 300мс (после анимации)
  setTimeout(() => {
    const form = popup.querySelector('form');
    if (form) form.reset();
    // Скрыть сообщения
    const messages = form.querySelectorAll('.form-message');
    messages.forEach(m => m.classList.remove('visible'));
  }, 300);
}

// Закрытие по клику на оверлей
document.querySelectorAll('.mc_popup').forEach(popup => {
  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      const id = popup.id.replace('popup-', '');
      closePopup(id);
    }
  });
});

// Закрытие по Esc
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const active = document.querySelector('.mc_popup.active');
    if (active) {
      const id = active.id.replace('popup-', '');
      closePopup(id);
    }
  }
});