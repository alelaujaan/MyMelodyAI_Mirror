from app.services.ai.ollama_service import ollama_service


def main():

    print("Preguntando a Luna...\n")

    response = ollama_service.generate(
        "Preséntate en una sola frase."
    )

    print(response)


if __name__ == "__main__":
    main()