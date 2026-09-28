from fastapi import APIRouter

from app.schemas.chat import (
    ChatRequest,
    ChatResponse,
)

from app.services.ai.chat_service import (
    chat_service,
)

from app.websocket import manager


router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


@router.post(
    "",
    response_model=ChatResponse,
)
async def chat(request: ChatRequest):

    result = chat_service.send_message(
        request.message
    )

    await manager.broadcast({
        "type": "luna_response",
        "message": result["message"],
        "emotion": result["emotion"],
        "actions": result["actions"],
    })

    return ChatResponse(
        message=result["message"],
        emotion=result["emotion"],
        actions=result["actions"],
    )
