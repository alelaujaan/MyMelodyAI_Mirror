from fastapi import APIRouter

from app.api.v1.endpoints.status import router as status_router
from app.api.v1.endpoints.chat import router as chat_router
from app.api.v1.endpoints.news import router as news_router
from app.api.v1.endpoints.weather import router as weather_router
from app.api.v1.endpoints.calendar import router as calendar_router

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(
    status_router,
    tags=["Status"],
)

api_router.include_router(
    chat_router,
)

api_router.include_router(
    news_router,
    prefix="/news",
    tags=["News"],
)

api_router.include_router(
    weather_router,
    prefix="/weather",
    tags=["Weather"],
)

api_router.include_router(
    calendar_router,
    prefix="/calendar",
    tags=["Calendar"],
)