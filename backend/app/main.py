from fastapi import FastAPI

from app.api.router import api_router
from app.core.constants import APP_NAME, APP_VERSION

app = FastAPI(
    title=APP_NAME,
    version=APP_VERSION,
)

app.include_router(api_router)