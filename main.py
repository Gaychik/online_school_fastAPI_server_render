from fastapi import FastAPI, Request, Form, Depends
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, RedirectResponse, JSONResponse
from pydantic import BaseModel, EmailStr
from typing import Optional
import uvicorn

app = FastAPI(title="ЕГЭЛЭНД - Онлайн школа")

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Templates
templates = Jinja2Templates(directory="templates")


class ContactForm(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    telegram: Optional[str] = None
    class_select: Optional[str] = None
    utm_source: Optional[str] = None
    utm_medium: Optional[str] = None
    utm_campaign: Optional[str] = None
    utm_term: Optional[str] = None
    utm_content: Optional[str] = None


@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    """Главная страница лендинга"""
    return templates.TemplateResponse("index.html", {
        "request": request,
        "title": "7 класс - ЕГЭЛЭНД"
    })


@app.post("/api/submit-form")
async def submit_form(form_data: ContactForm):
    """Обработка формы заявки"""
    # Здесь будет логика сохранения в БД и отправки уведомлений
    print(f"New form submission:")
    print(f"  Name: {form_data.name}")
    print(f"  Phone: {form_data.phone}")
    print(f"  Email: {form_data.email}")
    print(f"  Telegram: {form_data.telegram}")
    print(f"  Class: {form_data.class_select}")
    print(f"  UTM Source: {form_data.utm_source}")
    print(f"  UTM Medium: {form_data.utm_medium}")
    print(f"  UTM Campaign: {form_data.utm_campaign}")
    print(f"  UTM Term: {form_data.utm_term}")
    print(f"  UTM Content: {form_data.utm_content}")
    
    # В будущем можно добавить:
    # 1. Сохранение в базу данных
    # 2. Отправку email уведомления
    # 3. Отправку в Telegram
    # 4. Интеграцию с CRM
    
    return JSONResponse(
        status_code=200,
        content={"success": True, "message": "Заявка успешно отправлена"}
    )


@app.get("/thank-you", response_class=HTMLResponse)
async def thank_you(request: Request):
    """Страница благодарности"""
    return templates.TemplateResponse("thank_you.html", {
        "request": request,
        "title": "Спасибо за заявку!"
    })


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
