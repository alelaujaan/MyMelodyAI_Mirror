from collections import deque


class ConversationMemory:

    def __init__(self, system_prompt: str, max_messages: int = 20):

        self.system_prompt = system_prompt

        self.history = deque(maxlen=max_messages)

    def add_user(self, message: str):

        self.history.append({
            "role": "user",
            "content": message,
        })

    def add_assistant(self, message: str):

        self.history.append({
            "role": "assistant",
            "content": message,
        })

    def messages(self):

        return [

            {
                "role": "system",
                "content": self.system_prompt,
            },

            *self.history,

        ]

    def clear(self):

        self.history.clear()