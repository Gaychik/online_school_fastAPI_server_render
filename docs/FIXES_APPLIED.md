# 🔧 Исправление ошибок

## ✅ Что было исправлено

### 1. **Кнопки "Выбрать" на тарифах** 
**Проблема:** Классы `.package__btn` (с двумя подчеркиваниями) не обрабатывались
**Решение:** Добавлен класс `.package__btn` в селектор JavaScript

```javascript
// Теперь работают ВСЕ кнопки:
document.querySelectorAll('.package-btn, .package__btn, .mc_button.to-popup, .to-popup, .mc_button.consult')
```

### 2. **Кнопка "ЗАПИСАТЬСЯ НА ПРОБНЫЙ УРОК"**
**Проблема:** Это был `<div class="mc_button to-popup">`, а не `<button>`
**Решение:** JavaScript теперь работает и с div элементами

### 3. **Навигация по секциям**
**Проблема:** Не было ID `#programs` у секции
**Решение:** Добавлен `id="programs"` к section_3_subjects.html

### 4. **Бургер-меню**
**Проблема:** Недостаточно проверок в JavaScript
**Решение:** Добавлены console.log для отладки и улучшена логика

### 5. **Smooth Scroll**
**Проблема:** Нет отладки
**Решение:** Добавлены console.log для отслеживания кликов по якорям

---

## 🧪 Как тестировать

### Откройте консоль браузера (F12)

#### 1. Проверка кнопок
При загрузке страницы увидите:
```
DOM loaded - initializing scripts
Mobile toggle found
Burger elements: {...}
Burger menu initialized
Found popup buttons: 7  // должно быть >= 7
Adding click handler to: <button...>
Initializing smooth scroll
```

#### 2. При нажатии на кнопку "Выбрать":
```
Button clicked: <button class="package__btn">
```

#### 3. При нажатии на навигацию:
```
Anchor clicked: #programs
Target found: <section id="programs">
```

#### 4. При открытии бургер-меню:
```
Burger menu state: true  // при открытии
Burger menu state: false // при закрытии
```

---

## 🐛 Если что-то не работает

### Кнопки не открывают модальное окно:

1. Откройте консоль (F12)
2. Посмотрите, есть ли сообщение `Found popup buttons: X`
3. Если X = 0 - кнопки не найдены
4. Проверьте классы кнопок через инспектор элементов

**Проверка в консоли:**
```javascript
// Введите в консоли:
document.querySelectorAll('.package__btn')
// Должно вернуть 3 элемента (по количеству тарифов)

document.querySelectorAll('.to-popup')
// Должно вернуть 2+ элемента
```

### Навигация не работает:

1. Проверьте, есть ли ID у секций:
```javascript
document.querySelector('#programs')  // должно вернуть секцию
document.querySelector('#about')     // должно вернуть секцию
document.querySelector('#reviews')   // должно вернуть секцию
```

2. Если null - значит ID не добавлен
3. Смотрите логи в консоли при клике на ссылку

### Бургер-меню не работает:

1. Проверьте наличие элементов:
```javascript
document.querySelector('.burger-menu')      // должно вернуть меню
document.querySelector('.mobile-toggle')    // должно вернуть кнопку
document.querySelector('.burger-menu-overlay') // должно вернуть overlay
```

2. Смотрите логи в консоли:
- `Mobile toggle found` - если нет, то кнопка не найдена
- `Burger menu initialized` - если нет, проверьте наличие всех элементов

---

## 📋 Список всех ID секций

Проверьте, что все ID существуют:

```javascript
const ids = [
    '#about',       // О школе (hero)
    '#programs',    // Программы (section_3)
    '#how',         // Как устроена учёба (section_4)
    '#kurator',     // Кто такой куратор (section_7)
    '#programm',    // Программа курса (section_6)
    '#autor',       // Преподаватель (section_5)
    '#prices',      // Тарифы (section_9)
    '#reviews',     // Отзывы (section_8)
    '#contacts',    // Контакты (footer)
    '#consultation' // Консультация (section_10)
];

ids.forEach(id => {
    const el = document.querySelector(id);
    console.log(id, el ? '✓' : '✗ NOT FOUND');
});
```

---

## 🎯 Быстрая проверка всего

Вставьте в консоль:
```javascript
console.log('=== ПРОВЕРКА ===');
console.log('Кнопок:', document.querySelectorAll('.package__btn, .to-popup').length);
console.log('ID секций:', document.querySelectorAll('#about, #programs, #how, #kurator, #programm, #autor, #prices, #reviews, #contacts, #consultation').length);
console.log('Бургер меню:', document.querySelector('.burger-menu') ? '✓' : '✗');
console.log('Модальное окно:', document.getElementById('popup-callback') ? '✓' : '✗');
```

Должно вывести:
```
=== ПРОВЕРКА ===
Кнопок: 7
ID секций: 10
Бургер меню: ✓
Модальное окно: ✓
```

---

## 💡 Советы

1. **Всегда смотрите в консоль** при проблемах
2. **Очищайте кэш** браузера (Ctrl+Shift+R)
3. **Перезапускайте сервер** если hot reload не сработал
4. **Проверяйте логи сервера** - там видны UTM-метки и отправка форм

---

## 🚀 Всё работает?

Если в консоли видите:
- ✅ `Found popup buttons: 7` или больше
- ✅ Все 10 ID секций находятся
- ✅ Бургер меню находится
- ✅ Модальное окно находится

**ТО всё должно работать!** 

Если проблемы остаются - пришлите скриншот консоли с ошибками.
