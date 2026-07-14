from fastapi import APIRouter

from app.core.constants import (
    APP_NAME,
    APP_VERSION,
)

router = APIRouter()


@router.get("/status")
def get_status():

    return {
        "name": APP_NAME,
        "version": APP_VERSION,
        "status": "running",
    }