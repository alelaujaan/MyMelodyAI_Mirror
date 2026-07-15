from fastapi import FastAPI
from app.core.config import settings
from app.core.logging import setup_logging
import logging



from app.api.router import api_router
from app.core.constants import APP_NAME, APP_VERSION

setup_logging()

logger = logging.getLogger("mirror")

logger.info("Starting MyMelodyAI Mirror...")

print(settings.APP_NAME)
print(settings.DATABASE_URL)

app = FastAPI(
    title=APP_NAME,
    version=APP_VERSION,
)

app.include_router(api_router)