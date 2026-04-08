# database.py
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import String, DateTime, func
from typing import Optional
import os
from dotenv import load_dotenv
from datetime import datetime
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+asyncpg://postgres:postgres@localhost:5432/school_db")

# Асинхронный движок
engine = create_async_engine(DATABASE_URL, echo=False, future=True)

# Сессия
async_session_maker = async_sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False, autoflush=False
)


class Base(DeclarativeBase):
    """Базовый класс для моделей"""
    pass


class FormSubmission(Base):
    """Модель для хранения заявок"""
    __tablename__ = "form_submissions"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    
    # Тип формы: 'free_lesson' или 'callback'
    form_type: Mapped[str] = mapped_column(String(20), index=True)
    
    # Контактные данные
    name: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    phone: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)
    email: Mapped[Optional[str]] = mapped_column(String(120), nullable=True)
    telegram: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    
    # Дополнительно
    class_select: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)
    message: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    
    # UTM-метки
    utm_source: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    utm_medium: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    utm_campaign: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    utm_term: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    utm_content: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    
    # Метаданные
    ip_address: Mapped[Optional[str]] = mapped_column(String(45), nullable=True)
    user_agent: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())

    def __repr__(self):
        return f"<FormSubmission(id={self.id}, type={self.form_type}, name={self.name})>"


async def init_db():
    """Создание таблиц при старте"""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)