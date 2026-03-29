# 📘 Шпаргалка по модульным секциям

## Быстрый старт

### ✅ Создано 13 модульных файлов секций

Каждая секция теперь в отдельном файле в папке `templates/sections/`

---

## 📋 Список всех секций

| № | Файл | Секция | Строк |
|---|------|--------|-------|
| 1 | `section_1_banner.html` | Баннер с таймером | 26 |
| 2 | `section_2_hero.html` | Главный экран | 40 |
| 3 | `section_3_subjects.html` | Предметы | 32 |
| 4 | `section_4_benefits.html` | Преимущества | 54 |
| 5 | `section_5_program.html` | Программа | 23 |
| 6 | `section_6_calendar.html` | Календарь | 36 |
| 7 | `section_7_info.html` | Информация | 25 |
| 8 | `section_8_reviews.html` | Отзывы (Swiper) | 59 |
| 9 | `section_9_packages.html` | Пакеты и цены | 42 |
| 10 | `section_10_consultation.html` | Консультация | 15 |
| 11 | `section_11_faq.html` | FAQ | 40 |
| 12 | `section_12_license.html` | Лицензия | 22 |
| 13 | `section_13_final_cta.html` | Финальная форма | 47 |

---

## 🔧 Как использовать

### Подключить секцию в index.html:

```html
{% include 'sections/section_1_banner.html' %}
```

### Изменить порядок:

Просто переместите строку с `include` в нужное место в `index.html`

### Отключить секцию:

Закомментируйте:
```html
<!-- {% include 'section_7_info.html' %} -->
```

### Добавить новую:

1. Создайте файл `templates/sections/section_14_NEW.html`
2. Добавьте в `index.html`: `{% include 'sections/section_14_NEW.html' %}`

---

## 💡 Примеры

### Поменять местами секции "Преимущества" и "Предметы":

В `index.html` измените:

**Было:**
```html
{% include 'sections/section_3_subjects.html' %}
{% include 'sections/section_4_benefits.html' %}
```

**Стало:**
```html
{% include 'sections/section_4_benefits.html' %}
{% include 'sections/section_3_subjects.html' %}
```

### Убрать секцию "Лицензия":

Закомментируйте в `index.html`:
```html
<!-- {% include 'sections/section_12_license.html' %} -->
```

### Добавить A/B тест для секции "Отзывы":

Создайте две версии:
- `section_8_reviews_A.html` (вариант A)
- `section_8_reviews_B.html` (вариант B)

И подключайте нужную в зависимости от задачи.

---

## 🎯 Что изменилось

**До:**
```
templates/sections/main_sections.html (200+ строк)
```

**После:**
```
templates/sections/section_1_banner.html (26 строк)
templates/sections/section_2_hero.html (40 строк)
...и так далее для каждой секции
```

---

## ✅ Преимущества

- ✨ **Легко редактировать** - каждая секция в отдельном файле
- 🔄 **Можно переиспользовать** - подключайте секции на других страницах
- 🐛 **Меньше ошибок** - изменение одной секции не ломает другие
- 👥 **Удобно для команды** - разные люди могут работать с разными секциями
- 📊 **A/B тесты** - легко менять версии секций

---

## 🔍 Поиск проблем

Если секция не отображается:

1. ✅ Проверьте, что файл существует в `templates/sections/`
2. ✅ Проверьте, что секция подключена в `index.html`
3. ✅ Убедитесь, что имя файла указано правильно
4. ✅ Проверьте CSS стили для этой секции

---

## 📊 Итого

- **Файлов создано:** 13
- **Удалено файлов:** 1 (`main_sections.html`)
- **Общий размер:** ~650 строк HTML
- **Средний размер секции:** ~50 строк
- **Удобство поддержки:** ⭐⭐⭐⭐⭐

---

**Все секции теперь модульные!** 🎉
