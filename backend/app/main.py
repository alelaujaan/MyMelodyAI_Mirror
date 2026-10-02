from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import logging

from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.core.config import settings
from app.core.constants import APP_NAME, APP_VERSION
from app.core.logging import setup_logging
from app.memory import conversation_database
from app.websocket import manager


# Logging
setup_logging()

logger = logging.getLogger("mirror")
logger.info("Starting MyMelodyAI Mirror...")


# FastAPI
app = FastAPI(
    title=APP_NAME,
    version=APP_VERSION,
)


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://100.74.14.96:5173",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# API routes
app.include_router(api_router)


# WebSocket
@app.websocket("/ws/mirror")
async def mirror_websocket(websocket: WebSocket):
    await manager.connect(websocket)
    logger.info("Mirror WebSocket connected")

    try:
        await websocket.send_json({
            "type": "connected",
            "message": "Mirror WebSocket connected",
        })

        while True:
            await websocket.receive_text()

    except WebSocketDisconnect:
        manager.disconnect(websocket)
        logger.info("Mirror WebSocket disconnected")

    except Exception:
        manager.disconnect(websocket)
        logger.exception("Mirror WebSocket error")
