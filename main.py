# main.py
from fastapi import FastAPI, Request, Form, Depends, HTTPException, status
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, JSONResponse, RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator, EmailStr
from typing import Optional, Annotated
from contextlib import asynccontextmanager
import uvicorn
import os
from dotenv import load_dotenv
import json
from pathlib import Path


from database import init_db, async_session_maker, FormSubmission,engine,AsyncSession

load_dotenv()

# === Lifespan для инициализации БД ===
@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    print("✅ База данных инициализирована")
    yield
    await engine.dispose()

app = FastAPI(title="ЮНАЙТ - Онлайн школа", lifespan=lifespan)

# === CORS Middleware ===
origins = os.getenv("CORS_ORIGINS", "http://localhost:3000,https://el-ed.ru").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static & Templates
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# 🔥 Правильный способ: путь от местоположения этого файла
BASE_DIR = Path(__file__).resolve().parent
PROGRAMS_PATH = BASE_DIR / "data" / "programs.json"


# === Pydantic модели для валидации ===
class FreeLessonForm(BaseModel):
    """Валидация для формы бесплатного урока"""
    name: str = Field(..., min_length=2, max_length=100, description="Имя ученика/родителя")
    phone: str = Field(..., pattern=r'^[\d\+\s\-\(\)]{10,20}$', description="Телефон")
    email: Optional[EmailStr] = None
    class_select: str = Field(..., pattern=r'^[7-9]|1[0-1] класс$', description="Класс")
    
    # UTM
    utm_source: Optional[str] = None
    utm_medium: Optional[str] = None
    utm_campaign: Optional[str] = None
    utm_term: Optional[str] = None
    utm_content: Optional[str] = None

      # 🔥 Ключевой валидатор: пустая строка → None
    @field_validator('email', mode='before')
    @classmethod
    def empty_str_to_none(cls, v):
        if v == '' or v is None:
            return None
        return v

    @field_validator('phone')
    @classmethod
    def clean_phone(cls, v):
        return ''.join(filter(str.isdigit, v)) if v else v


class CallbackForm(BaseModel):
    """Валидация для формы обратного звонка"""
    name: str = Field(..., min_length=2, max_length=100)
    phone: str = Field(..., pattern=r'^[\d\+\s\-\(\)]{10,20}$')
    email: Optional[EmailStr] = None
    class_select: Optional[str] = Field(None, pattern=r'^[7-9]|1[0-1] класс$')
    
    # UTM
    utm_source: Optional[str] = None
    utm_medium: Optional[str] = None
    utm_campaign: Optional[str] = None
    utm_term: Optional[str] = None
    utm_content: Optional[str] = None

    @field_validator('phone')
    @classmethod
    def clean_phone(cls, v):
        return ''.join(filter(str.isdigit, v)) if v else v


# === Хелпер для сохранения в БД ===
async def save_submission(
    session: AsyncSession,
    form_type: str,
    data: dict,
    request: Request
):
    """Сохраняет заявку в базу данных"""
    submission = FormSubmission(
        form_type=form_type,
        name=data.get("name"),
        phone=data.get("phone"),
        email=data.get("email"),
        telegram=data.get("telegram"),
        class_select=data.get("class_select"),
        utm_source=data.get("utm_source"),
        utm_medium=data.get("utm_medium"),
        utm_campaign=data.get("utm_campaign"),
        utm_term=data.get("utm_term"),
        utm_content=data.get("utm_content"),
        ip_address=request.client.host if request.client else None,
        user_agent=request.headers.get("user-agent"),
    )
    session.add(submission)
    await session.commit()
    return submission


# === Эндпоинты ===

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
     # Читаем данные один раз при старте или кэшируем в продакшене
 
    programs = json.loads(PROGRAMS_PATH.read_text(encoding="utf-8"))
    
    return templates.TemplateResponse("index.html", {
        "request": request,
        "title": "ЮНАЙТ - Онлайн школа математики и программирования для школьников",
        "programs": programs  # ← Передаём в Jinja2
    })



# 🔹 НОВЫЙ: Обработка формы бесплатного урока
@app.post("/lesson")
async def free_lesson_submit(
    request: Request,
    name: Annotated[str, Form()],
    phone: Annotated[str, Form()],
    class_select: Annotated[str, Form()],
    email: Annotated[Optional[str], Form()] = None,
    utm_source: Annotated[Optional[str], Form()] = None,
    utm_medium: Annotated[Optional[str], Form()] = None,
    utm_campaign: Annotated[Optional[str], Form()] = None,
    utm_term: Annotated[Optional[str], Form()] = None,
    utm_content: Annotated[Optional[str], Form()] = None,
):
    """Обработка заявки на бесплатный урок"""
    try:
        # Валидация через Pydantic
        validated = FreeLessonForm(
            name=name,
            phone=phone,
            email=email,
            class_select=class_select,
            utm_source=utm_source,
            utm_medium=utm_medium,
            utm_campaign=utm_campaign,
            utm_term=utm_term,
            utm_content=utm_content,
        )
        
        async with async_session_maker() as session:
            await save_submission(
                session=session,
                form_type="free_lesson",
                data=validated.model_dump(),
                request=request
            )
        
        # 📧 Здесь можно добавить отправку уведомления в Telegram / email
        # await send_telegram_notification(validated)
        
        return JSONResponse(
                status_code=200,
                content={
                    "success": True,
                    "message": "Заявка принята! Перенаправляем...",
                    "redirect": "/thank-you"  # ← URL страницы благодарности
                }
            )
        
    except Exception as e:
        print(f"❌ Error in /free_lesson: {e}")
        raise HTTPException(
            status_code=400,
            detail={"success": False, "message": "Ошибка при обработке заявки. Попробуйте позже."}
        )


# # 🔹 Обновлённый: Обработка формы обратного звонка
# @app.post("/api/submit-form")
# async def submit_callback(
#     request: Request,
#     name: Annotated[str, Form()],
#     phone: Annotated[str, Form()],
#     email: Annotated[Optional[str], Form()] = None,
#     class_select: Annotated[Optional[str], Form()] = None,
#     utm_source: Annotated[Optional[str], Form()] = None,
#     utm_medium: Annotated[Optional[str], Form()] = None,
#     utm_campaign: Annotated[Optional[str], Form()] = None,
#     utm_term: Annotated[Optional[str], Form()] = None,
#     utm_content: Annotated[Optional[str], Form()] = None,
# ):
#     """Обработка заявки на обратный звонок"""
#     try:
#         validated = CallbackForm(
#             name=name,
#             phone=phone,
#             email=email,
#             class_select=class_select,
#             utm_source=utm_source,
#             utm_medium=utm_medium,
#             utm_campaign=utm_campaign,
#             utm_term=utm_term,
#             utm_content=utm_content,
#         )
        
#         async with async_session_maker() as session:
#             await save_submission(
#                 session=session,
#                 form_type="callback",
#                 data=validated.model_dump(),
#                 request=request
#             )
        
#         return JSONResponse(
#                 status_code=200,
#                 content={
#                     "success": True,
#                     "message": "Заявка принята! Перенаправляем...",
#                     "redirect": "/thank-you"  # ← URL страницы благодарности
#                 }
#             )
        
#     except Exception as e:
#         print(f"❌ Error in /api/submit-form: {e}")
#         raise HTTPException(
#             status_code=400,
#             detail={"success": False, "message": "Ошибка отправки. Проверьте данные."}
#         )


# Страница благодарности
@app.get("/thank-you", response_class=HTMLResponse)
async def thank_you(request: Request):
    return templates.TemplateResponse("thank_you.html", {
        "request": request,
        "title": "Спасибо за заявку!"
    })


# 🩺 Хелпер для проверки БД
@app.get("/health")
async def health_check():
    try:
        async with async_session_maker() as session:
            await session.execute("SELECT 1")
        return {"status": "ok", "database": "connected"}
    except Exception as e:
        return {"status": "error", "database": str(e)}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)