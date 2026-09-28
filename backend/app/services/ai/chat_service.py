from app.services.ai.ollama_service import ollama_service


class ChatService:

    def send_message(self, message: str) -> dict:

        response = ollama_service.generate(message)

        return {
            "message": response.strip(),
            "emotion": "neutral",
            "actions": [],
        }


chat_service = ChatService()