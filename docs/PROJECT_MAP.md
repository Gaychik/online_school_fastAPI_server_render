# 🗺️ Карта проекта

## Визуальная структура

```
online_school_fastAPI_server_render/
│
├── 📄 main.py                          # FastAPI приложение
├── 📄 requirements.txt                 # Зависимости Python
├── 📄 start_server.bat                 # Скрипт запуска для Windows
├── 📄 .gitignore                       # Git игнор
│
├── 📁 templates/                       # HTML шаблоны (Jinja2)
│   ├── base.html                      # Базовый шаблон
│   ├── index.html                     # Главная (компоновка секций)
│   ├── thank_you.html                 # Страница благодарности
│   │
│   ├── 📁 partials/                   # Части шаблонов
│   │   ├── header.html                # Шапка сайта
│   │   └── footer.html                # Подвал сайта
│   │
│   └── 📁 sections/                   # Модульные секции (13 файлов)
│       ├── section_1_banner.html      # Баннер с таймером
│       ├── section_2_hero.html        # Главный экран
│       ├── section_3_subjects.html    # Предметы
│       ├── section_4_benefits.html    # Преимущества
│       ├── section_5_program.html     # Программа обучения
│       ├── section_6_calendar.html    # Календарь занятий
│       ├── section_7_info.html        # Информация
│       ├── section_8_reviews.html     # Отзывы (Swiper)
│       ├── section_9_packages.html    # Пакеты и цены
│       ├── section_10_consultation.html # Консультация
│       ├── section_11_faq.html        # FAQ
│       ├── section_12_license.html    # Лицензия
│       └── section_13_final_cta.html  # Финальная форма
│
├── 📁 static/                         # Статические файлы
│   ├── 📁 css/                        # Стили
│   │   ├── main.css                  # Базовые стили + сброс
│   │   ├── components.css            # Компоненты (header, footer, buttons)
│   │   ├── sections.css              # Стили всех секций
│   │   └── responsive.css            # Адаптивность
│   │
│   ├── 📁 js/                         # JavaScript
│   │   └── main.js                   # Основной JS + функции секций
│   │
│   ├── 📁 img/                        # Изображения
│   │   ├── logo.svg                  # Логотип
│   │   ├── icon1.svg                 # Иконка 1
│   │   ├── icon2.svg                 # Иконка 2
│   │   ├── banner-bg.jpg             # Фон баннера
│   │   ├── benefit2.png              # Изображение преимущества 2
│   │   ├── benefit3.png              # Изображение преимущества 3
│   │   ├── benefit5.png              # Изображение преимущества 5
│   │   ├── program.jpg               # Фото программы
│   │   ├── info-section6.jpg         # Info секция 6
│   │   ├── form-photo.jpg            # Фото формы
│   │   └── license.jpg               # Лицензия
│   │
│   └── 📁 fonts/                      # Шрифты
│       ├── Inter-Regular.ttf
│       ├── Roboto-Regular.ttf
│       ├── Montserrat-Regular.ttf
│       └── DrukCyr-Medium.ttf
│
├── 📁 docs/                           # Документация
│   ├── MODULAR_SECTIONS.md           # Полное руководство по модулям
│   ├── CHEATSHEET.md                 # Быстрая шпаргалка
│   ├── MODULARIZATION_COMPLETE.md    # Отчет о модуляризации
│   ├── CHANGES_SUMMARY.md            # Краткое резюме изменений
│   └── PROJECT_MAP.md                # Этот файл
│
├── 📁 .qoder/                         # Настройки Qoder
│   ├── agents/
│   └── skills/
│
├── 📄 README.md                       # Основная документация
├── 📄 QUICK_START.md                  # Быстрый старт
├── 📄 PROJECT_COMPLETE.md             # Отчет о завершении проекта
└── 📄 файл с сайтом.html              # Исходный лендинг (оригинал)
```

---

## 🔄 Поток данных

```
Пользователь → Браузер → http://localhost:8000
                              ↓
                        main.py (FastAPI)
                              ↓
                    templates/index.html
                              ↓
          ┌───────────────────┴───────────────────┐
          ↓                                       ↓
    {% include %}                          {% block content %}
          ↓                                       ↓
   templates/sections/                    templates/base.html
          ↓                                       ↓
    13 модульных файлов                      Header + Footer
          ↓                                       ↓
          └───────────────────┬───────────────────┘
                              ↓
                    Рендеринг HTML
                              ↓
                    Static files (CSS, JS, IMG)
                              ↓
                        Готовая страница
```

---

## 📊 Размеры файлов

### Основные файлы

| Файл | Размер | Назначение |
|------|--------|------------|
| `main.py` | ~2.4KB | FastAPI роуты и формы |
| `templates/index.html` | ~3KB | Компоновка секций |
| `templates/base.html` | ~2KB | Базовый шаблон |
| `static/css/sections.css` | ~15KB | Стили секций |
| `static/js/main.js` | ~8KB | JavaScript функции |

### Секции (HTML)

| Секция | Файл | Строк |
|--------|------|-------|
| Banner | `section_1_banner.html` | 26 |
| Hero | `section_2_hero.html` | 40 |
| Subjects | `section_3_subjects.html` | 32 |
| Benefits | `section_4_benefits.html` | 54 |
| Program | `section_5_program.html` | 23 |
| Calendar | `section_6_calendar.html` | 36 |
| Info | `section_7_info.html` | 25 |
| Reviews | `section_8_reviews.html` | 59 |
| Packages | `section_9_packages.html` | 42 |
| Consultation | `section_10_consultation.html` | 15 |
| FAQ | `section_11_faq.html` | 40 |
| License | `section_12_license.html` | 22 |
| Final CTA | `section_13_final_cta.html` | 47 |

**Итого:** ~563 строк чистого HTML

---

## 🎯 Архитектура

### Уровни абстракции

```
Уровень 1: FastAPI Application (main.py)
         ↓
Уровень 2: Jinja2 Templates (templates/)
         ↓
Уровень 3: Modular Sections (templates/sections/)
         ↓
Уровень 4: Static Assets (static/)
         ↓
Уровень 5: Browser Rendering
```

### Компоненты

**Backend:**
- FastAPI (веб-фреймворк)
- Jinja2 (шаблонизатор)
- Pydantic (валидация форм)
- Uvicorn (ASGI сервер)

**Frontend:**
- HTML5 (структура)
- CSS3 (стили, Grid, Flexbox)
- Vanilla JavaScript (интерактивность)
- Swiper (слайдер)

**Архитектура:**
- Server-Side Rendering (SSR)
- Модульная структура шаблонов
- Разделение ответственности (SoC)

---

## 🔍 Навигация по коду

### Найти секцию:

```bash
# Все секции в одном месте
ls templates/sections/
```

### Найти стиль:

```bash
# Стили секций
cat static/css/sections.css

# Стили компонентов
cat static/css/components.css
```

### Найти функцию JS:

```bash
# Все JS функции
grep "function" static/js/main.js
```

---

## 📦 Зависимости

### Python пакеты (requirements.txt)

```
fastapi==0.104.1
uvicorn==0.24.0
jinja2==3.1.2
pydantic==2.5.0
python-multipart==0.0.6
```

### Frontend библиотеки (CDN)

```html
<!-- Swiper CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">

<!-- Swiper JS -->
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
```

---

## 🚀 Точки входа

### Основное приложение

**Файл:** `main.py`

```python
from fastapi import FastAPI
from fastapi.templating import Jinja2Templates

app = FastAPI()
templates = Jinja2Templates(directory="templates")

@app.get("/")
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})
```

### Главный шаблон

**Файл:** `templates/index.html`

```html
{% extends "base.html" %}

{% block content %}
{% include 'sections/section_1_banner.html' %}
{% include 'sections/section_2_hero.html' %}
...
{% endblock %}
```

### Базовый шаблон

**Файл:** `templates/base.html`

```html
<!DOCTYPE html>
<html lang="ru">
<head>...</head>
<body>
    {% include 'partials/header.html' %}
    
    <main>{% block content %}{% endblock %}</main>
    
    {% include 'partials/footer.html' %}
</body>
</html>
```

---

## 📈 Масштабирование

### Добавление новой страницы

1. Создайте `templates/new_page.html`
2. Добавьте роут в `main.py`
3. Подключите нужные секции

### Добавление новой секции

1. Создайте `templates/sections/section_14_new.html`
2. Добавьте `{% include ... %}` в index.html

### Добавление API endpoint

1. Добавьте новый роут в `main.py`
2. Используйте Pydantic для валидации
3. Верните JSON response

---

## 🎨 Стилевая архитектура

```
CSS Architecture:
├── main.css          # Reset, typography, base styles
├── components.css    # Reusable components (buttons, header, footer)
├── sections.css      # Section-specific styles (#section-1, #section-2, ...)
└── responsive.css    # Media queries for all breakpoints
```

---

## 🧩 Модульность

Каждая секция - независимый компонент:

```
Section Component:
├── HTML Structure (templates/sections/)
├── CSS Styles (#section-X in sections.css)
├── JavaScript Functions (in main.js)
└── Images (static/img/)
```

---

**Карта проекта готова!** 🗺️

Используйте этот файл для навигации по структуре проекта.
