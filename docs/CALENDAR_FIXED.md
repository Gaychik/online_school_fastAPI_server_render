# ✅ КАЛЕНДАРЬ ИСПРАВЛЕН - РАБОТАЕТ АККОРДЕОН!

## 🔥 ПРОБЛЕМА:

Месяцы были статичными - Ноябрь раскрыт всегда, остальные закрыты. Нельзя было открыть/закрыть.

---

## ✅ ЧТО ИСПРАВЛЕНО:

### 1. **CSS** ([fix-sections.css](file://c:\Users\Roman%20Gaychikov\Desktop\online_school_fastAPI_server_render\static\css\fix-sections.css))

Добавлено правило для месяцев с классом `.open`:
```css
.calendar .month.open + .info {
    max-height: 500px !important;
    opacity: 1 !important;
}
```

Теперь контент показывается только когда у месяца есть класс `.open`

### 2. **HTML** ([section_6_calendar.html](file://c:\Users\Roman%20Gaychikov\Desktop\online_school_fastAPI_server_render\templates\sections\section_6_calendar.html))

- ✅ Добавлен `onclick="toggleMonth(this)"` на все месяцы
- ✅ Убран класс `active` с Ноября (теперь управляется через `.open`)
- ✅ Ноябрь имеет класс `open` по умолчанию (раскрыт при загрузке)

### 3. **JavaScript** ([main.js](file://c:\Users\Roman%20Gaychikov\Desktop\online_school_fastAPI_server_render\static\js\main.js))

Функция `toggleMonth` переписана:
```javascript
window.toggleMonth = function(element) {
    // Закрывает все другие месяцы
    // Открывает/закрывает нажатый месяц
    // Переключает класс .open и .active
}
```

---

## 🎯 КАК ТЕПЕРЬ РАБОТАЕТ:

### **При загрузке:**
- ✅ **Ноябрь раскрыт** (класс `open` + `active` у info)
- ✅ Все остальные месяцы **закрыты**

### **При клике на месяц:**
1. Если нажать на **закрытый месяц** → он откроется, Ноябрь закроется
2. Если нажать на **открытый месяц** → он закроется
3. Всегда открыт **только один месяц** (аккордеон)

---

## 🧪 ПРОВЕРКА:

### 1. **Обновите страницу** (Ctrl+Shift+R)

### 2. **Проверьте календарь:**

✅ **Ноябрь раскрыт при загрузке** - видны темы Алгебры и Геометрии

✅ **Нажмите на Декабрь**:
   - Декабрь должен раскрыться
   - Ноябрь должен закрыться
   - В консоли: `toggleMonth called Декабрь` + `Month toggled: OPEN`

✅ **Нажмите на Ноябрь снова**:
   - Ноябрь должен раскрыться
   - Декабрь должен закрыться

✅ **Нажмите на любой другой месяц** (Январь, Февраль и т.д.)

✅ **Нажмите на открытый месяц еще раз** - должен закрыться

---

## 📊 ЛОГИКА РАБОТЫ:

```
Загрузка страницы:
  Ноябрь: [open] + [info.active] ← РАСКРЫТ
  Декабрь: [] + [info] ← ЗАКРЫТ
  Январь: [] + [info] ← ЗАКРЫТ

Клик на Декабрь:
  Ноябрь: [] + [info] ← ЗАКРЫЛСЯ
  Декабрь: [open] + [info.active] ← РАСКРЫЛСЯ
  Январь: [] + [info] ← ЗАКРЫТ

Клик на Декабрь еще раз:
  Ноябрь: [] + [info] ← ЗАКРЫТ
  Декабрь: [] + [info] ← ЗАКРЫЛСЯ
  Январь: [] + [info] ← ЗАКРЫТ
```

---

## 🔍 ОТЛАДКА:

### В консоли должно быть:
```
toggleMonth called Ноябрь
Month toggled: OPEN

toggleMonth called Декабрь
Month toggled: OPEN

toggleMonth called Декабрь
Month toggled: CLOSED
```

### Если не работает:
1. Проверьте, что onclick есть:
   ```javascript
   console.log(document.querySelectorAll('.calendar .month[onclick]').length);
   // Должно быть: 7
   ```

2. Проверьте классы:
   ```javascript
   const november = document.querySelector('.calendar .month');
   console.log('Ноябрь open:', november.classList.contains('open'));
   console.log('Ноябрь info active:', november.nextElementSibling.classList.contains('active'));
   ```

---

**Сервер:** http://localhost:8000

**ОБНОВИТЕ (Ctrl+Shift+R) и проверьте аккордеон!** 🎯
