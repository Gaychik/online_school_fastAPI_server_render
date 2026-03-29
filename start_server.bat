@echo off
echo ========================================
echo  Запуск сервера ЕГЭЛЭНД (FastAPI)
echo ========================================
echo.

REM Проверка наличия виртуального окружения
if not exist "venv\" (
    echo [1/3] Создание виртуального окружения...
    python -m venv venv
    if errorlevel 1 (
        echo ОШИБКА: Не удалось создать виртуальное окружение
        pause
        exit /b 1
    )
)

echo [2/3] Активация виртуального окружения...
call venv\Scripts\activate.bat

echo [3/3] Установка зависимостей...
pip install -r requirements.txt --quiet

echo.
echo ========================================
echo  Сервер запущен!
echo  Откройте: http://localhost:8000
echo ========================================
echo.
echo Для остановки нажмите Ctrl+C
echo.

python main.py

pause
