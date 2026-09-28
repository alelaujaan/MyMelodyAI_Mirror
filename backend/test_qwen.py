from ollama import chat


response = chat(
    model="qwen3:4b-instruct",
    messages=[
        {
            "role": "user",
            "content": "/no_think\nResponde exactamente: Hola Luna",
        }
    ],
    think=False,
    options={
        "num_predict": 100,
    },
)

print()
print("========== RESPONSE ==========")
print(response)

print()
print("========== CONTENT ==========")
print(repr(response.message.content))

print()
print("========== THINKING ==========")
print(repr(response.message.thinking))

print()
print("========== DONE REASON ==========")
print(response.done_reason)