
    document.addEventListener('DOMContentLoaded', () => {

    // === Захват UTM-меток из URL ===
    function captureUTM() {
        const params = new URLSearchParams(window.location.search);
        ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(key => {
            const value = params.get(key);
            if (value) {
                document.getElementById(key)?.setAttribute('value', value);
                // Также для попапа
                document.getElementById(key + '_popup')?.setAttribute('value', value);
            }
        });
    }
    captureUTM();

    const LessonForms = document.getElementsByClassName('lesson-form');
    if (LessonForms) {
        for(let f of LessonForms)
        {
             f.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                const submitBtn = document.getElementById('submit-btn');
                if (!submitBtn) return;
                
                const btnText = submitBtn.querySelector('.btn-text');
                const btnLoader = submitBtn.querySelector('.btn-loader');
                const messageEl = document.getElementById('form-message');
                
                // Валидация checkbox
                const checkbox = this.querySelector('input[type="checkbox"]');
                if (checkbox && !checkbox.checked) {
                    showMessage(messageEl, '⚠️ Необходимо согласие на обработку данных', 'error');
                    return;
                }
                
                // Блокировка кнопки
                submitBtn.disabled = true;
                if (btnText) btnText.style.display = 'none';
                if (btnLoader) btnLoader.style.display = 'inline';
                
                try {
                    const formData = new FormData(this);
                    
                    const response = await fetch('/lesson', {
                        method: 'POST',
                        body: formData,
                        headers: { 'Accept': 'application/json' }
                    });
                    
                    const result = await response.json();
                    
                    if (response.ok && result.success) {
                        showMessage(messageEl, '✅ ' + result.message, 'success');
                        this.reset();
                        
                        if (result.redirect) {
                            setTimeout(() => {
                                window.location.href = result.redirect;
                            }, 2000);
                        }
                    } else {
                        throw new Error(result.detail?.message || 'Ошибка сервера');
                    }
                    
                } catch (error) {
                    console.error('Form error:', error);
                    showMessage(messageEl, '❌ ' + (error.message || 'Не удалось отправить заявку'), 'error');
                } finally {
                    // Разблокировка
                    submitBtn.disabled = false;
                    if (btnText) btnText.style.display = 'inline';
                    if (btnLoader) btnLoader.style.display = 'none';
                }
            });
        }
    }
    // === Утилиты ===
   function showMessage(el, text, type) {
        // ✅ el передаётся извне — больше никаких глобальных переменных
        if (!el) {
            console.warn('⚠️ Элемент form-message не найден');
            return;
        }
        
        el.textContent = text;
        el.className = `form-message ${type}`; // сбрасываем классы
        el.style.display = 'block';
        
        // ✅ Запускаем анимацию появления через небольшой delay, чтобы CSS transition сработал
        requestAnimationFrame(() => {
            el.classList.add('visible');
        });
        
        // Автоматическое скрытие для успешных сообщений
        if (type === 'success') {
            setTimeout(() => {
                el.classList.remove('visible');
                setTimeout(() => {
                    if (!el.classList.contains('visible')) {
                        el.style.display = 'none';
                    }
                }, 350); // ждём окончания transition
            }, 5000);
        }
        // Ошибки не скрываем автоматически — пользователь должен увидеть
    }
    
    // === Маска для телефона (опционально) ===
    const phoneInputs = document.querySelectorAll('input[type="tel"]');

    phoneInputs.forEach(input => {
    input.addEventListener('input', function(e) {
        // 1. Оставляем только цифры
        let digits = e.target.value.replace(/\D/g, '');
        
        // 2. Если начинается с 8 — заменяем на 7
        if (digits.startsWith('8')) {
            digits = '7' + digits.slice(1);
        }
        
        // 3. Если не начинается с 7 — добавляем 7 в начало (или очищаем)
        if (!digits.startsWith('7')) {
            digits = '7' + digits;
        }
        
        // 4. Обрезаем до 11 цифр (7 + 10-значный номер)
        digits = digits.slice(0, 11);
        
        // 5. Форматируем: +7 (XXX) XXX-XX-XX
        let formatted = '+7';
        if (digits.length > 1) {
            formatted += ' (' + digits.slice(1, 4);
        }
        if (digits.length >= 5) {
            formatted += ') ' + digits.slice(4, 7);
        }
        if (digits.length >= 8) {
            formatted += '-' + digits.slice(7, 9);
        }
        if (digits.length >= 10) {
            formatted += '-' + digits.slice(9, 11);
        }
        
        // 6. Убираем лишние скобки/дефисы при неполном вводе
        formatted = formatted.replace(/\(+\)+/g, '').replace(/--/g, '-').trim();
        if (formatted.endsWith('(') || formatted.endsWith('-')) {
            formatted = formatted.slice(0, -1);
        }
        
        e.target.value = formatted;
    });
    
    // Дополнительно: очистка при фокусе, если поле пустое
    input.addEventListener('focus', function() {
        if (!this.value || this.value === '+7') {
            this.value = '+7 (';
        }
    });
    
    // При потере фокуса — валидация длины
    input.addEventListener('blur', function() {
        const digits = this.value.replace(/\D/g, '');
        if (digits.length < 11) {
            // Можно добавить визуальную ошибку
            this.classList.add('error');
        } else {
            this.classList.remove('error');
        }
    });
    });
}) ;