# 🧪 ПРОВЕРКА - ВСЁ ЛИ РАБОТАЕТ?

## ⚠️ ВАЖНО: Откройте КОНСОЛЬ БРАУЗЕРА (F12), а не сервера!

---

## 📋 Шаг 1: Откройте консоль браузера

1. Откройте **http://localhost:8000** в браузере
2. Нажмите **F12** или **Ctrl+Shift+I**
3. Перейдите на вкладку **"Console"** (Консоль)
4. **ОБНОВИТЕ страницу** (Ctrl+R или F5)

---

## ✅ Шаг 2: Что должно быть в консоли

При загрузке страницы вы должны увидеть:

```
=== main.js LOADED ===
DOM Content Loaded handler started
✓ Mobile toggle found
Burger elements check: {menu: true, overlay: true, close: true, links: 11}
✓ Burger menu initialized
Initializing smooth scroll for anchor links
=== FOUND POPUP BUTTONS ===
Total buttons found: 7
1. package__btn Выбрать
2. package__btn Выбрать
3. package__btn Выбрать
4. mc_button to-popup Узнать подробнее
5. mc_button to-popup ЗАПИСАТЬСЯ НА ПРОБНЫЙ УРОК
6. mc_button consult Получить консультацию!
7. mc_button to-popup Узнать подробнее
=== END OF main.js ===
```

**Если видите это - JavaScript работает!** ✅

---

## 🔍 Шаг 3: Проверка работы кнопок

### Кнопка "Выбрать" на тарифе:
1. Найдите секцию с тарифами
2. Нажмите на кнопку **"Выбрать"**
3. В консоли должно появиться:
   ```
   === BUTTON CLICKED ===
   Class: package__btn
   Text: Выбрать
   openPopup called with: callback
   ✓ Popup found, opening...
   ```
4. Модальное окно должно открыться

### Кнопка "Узнать подробнее":
1. Прокрутите вверх к герою
2. Нажмите **"Узнать подробнее"**
3. В консоли:
   ```
   === BUTTON CLICKED ===
   Class: mc_button to-popup
   Text: Узнать подробнее
   openPopup called with: callback
   ```

### Кнопка "Получить консультацию!":
1. Найдите секцию консультации
2. Нажмите **"Получить консультацию!"**
3. Должно открыться модальное окно

---

## 🍔 Шаг 4: Проверка бургер-меню

1. **Сузьте окно браузера** (< 992px) ИЛИ откройте с мобильного
2. В правом верхнем углу должна появиться иконка меню (три полоски)
3. Нажмите на неё
4. В консоли:
   ```
   Mobile toggle clicked
   Burger menu state: OPEN
   ```
5. Меню должно выехать справа
6. Нажмите на любую ссылку в меню
7. В консоли:
   ```
   Burger closed via link click
   ```

---

## 🎯 Шаг 5: Проверка навигации

1. Нажмите на пункт меню **"Программы"**
2. В консоли:
   ```
   Anchor clicked: #programs
   ✓ Target found: SECTION
   ```
3. Страница должна плавно прокрутиться к секции "Для кого этот курс"

Попробуйте другие пункты:
- **"О школе"** → скролл к hero секции
- **"Отзывы"** → скролл к отзывам
- **"Цены"** → скролл к тарифам
- **"Контакты"** → скролл к футеру

---

## ❌ Если НЕ работает

### В консоли пусто:

**Проблема:** JavaScript не загружается

**Решение:**
1. Очистите кэш браузера: **Ctrl+Shift+R**
2. Проверьте, что main.js загружается (вкладка Network → должен быть status 200 или 304)
3. Попробуйте другой браузер

### Ошибки в консоли:

Сделайте скриншот ошибки и пришлите мне.

### Кнопки не работают:

Проверьте в консоли:
```javascript
// Вставьте в консоль:
console.log('Buttons:', document.querySelectorAll('.package__btn, .to-popup').length);
```

Должно быть: **7**

Если 0 - значит кнопки не найдены. Проверьте, что классы правильные через инспектор элементов.

### Бургер-меню не работает:

Проверьте:
```javascript
console.log('Burger:', document.querySelector('.burger-menu'));
console.log('Toggle:', document.querySelector('.mobile-toggle'));
```

Должно вернуть элементы, а не null.

---

## 🆘 Аварийная проверка

Вставьте в консоль:
```javascript
console.log('=== ЭКСПРЕСС-ПРОВЕРКА ===');
console.log('1. JS загружен:', typeof window.openPopup === 'function' ? '✓' : '✗');
console.log('2. Кнопок найдено:', document.querySelectorAll('.package__btn, .to-popup, .consult').length);
console.log('3. Бургер есть:', document.querySelector('.burger-menu') ? '✓' : '✗');
console.log('4. Модалка есть:', document.getElementById('popup-callback') ? '✓' : '✗');
console.log('5. ID секций:', document.querySelectorAll('#about, #programs, #prices, #reviews').length, 'из 4');
```

**Должно вывести:**
```
=== ЭКСПРЕСС-ПРОВЕРКА ===
1. JS загружен: ✓
2. Кнопок найдено: 7
3. Бургер есть: ✓
4. Модалка есть: ✓
5. ID секций: 4 из 4
```

---

## 📸 Пришлите скриншот консоли

Если проблемы остаются, сделайте скриншот:
1. Вкладки Console (F12)
2. После полной загрузки страницы
3. После нажатия на кнопку "Выбрать"

Это поможет понять, где проблема.
