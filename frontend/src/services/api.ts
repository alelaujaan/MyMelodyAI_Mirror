const API_URL = "http://127.0.0.1:8000/api/v1";

export async function api<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {

    const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
            "Content-Type": "application/json",
            ...(options?.headers ?? {}),
        },
        ...options,
    });

    if (!response.ok) {
        throw new Error(
            `API Error: ${response.status}`
        );
    }

    return response.json() as Promise<T>;
}