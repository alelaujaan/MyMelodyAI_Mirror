import { api } from "./api";

export interface ChatResponse {
    message: string;
    emotion: string;
    actions: string[];
}

export async function sendMessage(
    message: string,
): Promise<ChatResponse> {

    return api<ChatResponse>("/chat", {
        method: "POST",
        body: JSON.stringify({
            message,
        }),
    });

}