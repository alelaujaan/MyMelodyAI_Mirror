
import { useEffect, useState } from "react";

import { API_URL } from "../../config";

type ChatResponse = {
    message: string;
    emotion: string;
    actions: string[];
};

type CalendarEvent = {
    id: number;
    title: string;
    date: string;
    time: string;
    location?: string | null;
    notes?: string | null;
    created_at?: string | null;
};

export default function MobileChat() {
    const [message, setMessage] = useState<string>("");
    const [response, setResponse] =
        useState<ChatResponse | null>(null);
    const [loading, setLoading] =
        useState<boolean>(false);
    const [error, setError] =
        useState<string>("");
    const [showAddEvent, setShowAddEvent] =
        useState<boolean>(false);
    const [showCalendar, setShowCalendar] =
        useState<boolean>(false);
    const [events, setEvents] =
        useState<CalendarEvent[]>([]);
    const [calendarLoading, setCalendarLoading] =
        useState<boolean>(false);
    const [eventTitle, setEventTitle] =
        useState<string>("");
    const [eventDate, setEventDate] =
        useState<string>("");
    const [eventTime, setEventTime] =
        useState<string>("");
    const [eventLocation, setEventLocation] =
        useState<string>("");
    const [eventNotes, setEventNotes] =
        useState<string>("");
    const [eventError, setEventError] =
        useState<string>("");

    async function sendMessage(): Promise<void> {
        const text = message.trim();

        if (!text || loading) {
            return;
        }

        setLoading(true);
        setError("");
        setResponse(null);

        try {
            const res = await fetch(
                `${API_URL}/chat`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        message: text,
                    }),
                }
            );

            if (!res.ok) {
                throw new Error(
                    `Error del servidor: ${res.status}`
                );
            }

            const data: ChatResponse =
                await res.json();

            setResponse(data);
            setMessage("");
        } catch (err) {
            console.error(err);

            setError(
                "No se ha podido conectar con Luna."
            );
        } finally {
            setLoading(false);
        }
    }

    function handleKeyDown(
        event: React.KeyboardEvent<HTMLInputElement>
    ): void {
        if (event.key === "Enter") {
            sendMessage();
        }
    }

    async function loadEvents(): Promise<void> {
        setCalendarLoading(true);
        setEventError("");

        try {
            const res = await fetch(
                `${API_URL}/calendar`
            );

            if (!res.ok) {
                throw new Error(
                    "No se pudieron cargar los eventos."
                );
            }

            const data: CalendarEvent[] =
                await res.json();

            setEvents(data);
        } catch (err) {
            console.error(err);

            setEventError(
                "No se pudo cargar el calendario."
            );
        } finally {
            setCalendarLoading(false);
        }
    }

    async function createEvent(): Promise<void> {
        if (
            !eventTitle.trim() ||
            !eventDate ||
            !eventTime
        ) {
            setEventError(
                "Título, fecha y hora son obligatorios."
            );

            return;
        }

        setCalendarLoading(true);
        setEventError("");

        try {
            const res = await fetch(
                `${API_URL}/calendar`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        title: eventTitle.trim(),
                        date: eventDate,
                        time: eventTime,
                        location:
                            eventLocation.trim() || null,
                        notes:
                            eventNotes.trim() || null,
                    }),
                }
            );

            if (!res.ok) {
                throw new Error(
                    "No se pudo crear el evento."
                );
            }

            setEventTitle("");
            setEventDate("");
            setEventTime("");
            setEventLocation("");
            setEventNotes("");

            setShowAddEvent(false);

            await loadEvents();
        } catch (err) {
            console.error(err);

            setEventError(
                "No se pudo crear el evento."
            );
        } finally {
            setCalendarLoading(false);
        }
    }

    async function deleteEvent(
        eventId: number
    ): Promise<void> {
        const confirmed = window.confirm(
            "¿Quieres eliminar este evento?"
        );

        if (!confirmed) {
            return;
        }

        setCalendarLoading(true);
        setEventError("");

        try {
            const res = await fetch(
                `${API_URL}/calendar/${eventId}`,
                {
                    method: "DELETE",
                }
            );

            if (!res.ok) {
                throw new Error(
                    "No se pudo eliminar el evento."
                );
            }

            await loadEvents();
        } catch (err) {
            console.error(err);

            setEventError(
                "No se pudo eliminar el evento."
            );
        } finally {
            setCalendarLoading(false);
        }
    }

    function openCalendar(): void {
        setShowCalendar(true);
        setShowAddEvent(false);
        loadEvents();
    }

    function openAddEvent(): void {
        setShowAddEvent(true);
        setShowCalendar(false);
        setEventError("");
    }

    useEffect(() => {
        if (showCalendar) {
            loadEvents();
        }
    }, [showCalendar]);

    return (
        <main className="mobile-chat">
            <header className="mobile-chat__header">
                <h1>Luna</h1>

                <span>
                    MyMelodyAI Mirror
                </span>
            </header>

            <section className="mobile-chat__conversation">
                {response && (
                    <div className="message message--luna">
                        <span className="message__author">
                            Luna
                        </span>

                        <p>
                            {response.message}
                        </p>
                    </div>
                )}

                {error && (
                    <div className="message message--error">
                        {error}
                    </div>
                )}
            </section>

            {showAddEvent && (
                <section className="calendar-panel">
                    <div className="calendar-panel__header">
                        <h2>
                            Nuevo evento
                        </h2>

                        <button
                            type="button"
                            onClick={() =>
                                setShowAddEvent(false)
                            }
                        >
                            ✕
                        </button>
                    </div>

                    <input
                        type="text"
                        value={eventTitle}
                        onChange={(event) =>
                            setEventTitle(
                                event.target.value
                            )
                        }
                        placeholder="Título"
                    />

                    <input
                        type="date"
                        value={eventDate}
                        onChange={(event) =>
                            setEventDate(
                                event.target.value
                            )
                        }
                    />

                    <input
                        type="time"
                        value={eventTime}
                        onChange={(event) =>
                            setEventTime(
                                event.target.value
                            )
                        }
                    />

                    <input
                        type="text"
                        value={eventLocation}
                        onChange={(event) =>
                            setEventLocation(
                                event.target.value
                            )
                        }
                        placeholder="Lugar (opcional)"
                    />

                    <textarea
                        value={eventNotes}
                        onChange={(event) =>
                            setEventNotes(
                                event.target.value
                            )
                        }
                        placeholder="Notas (opcional)"
                    />

                    {eventError && (
                        <p className="calendar-panel__error">
                            {eventError}
                        </p>
                    )}

                    <button
                        type="button"
                        onClick={createEvent}
                        disabled={calendarLoading}
                    >
                        {calendarLoading
                            ? "Guardando..."
                            : "Guardar evento"}
                    </button>
                </section>
            )}

            {showCalendar && (
                <section className="calendar-panel">
                    <div className="calendar-panel__header">
                        <h2>
                            Calendario
                        </h2>

                        <button
                            type="button"
                            onClick={() =>
                                setShowCalendar(false)
                            }
                        >
                            ✕
                        </button>
                    </div>

                    {calendarLoading && (
                        <p>
                            Cargando...
                        </p>
                    )}

                    {!calendarLoading &&
                        events.length === 0 && (
                            <p>
                                No tienes eventos.
                            </p>
                        )}

                    {!calendarLoading &&
                        events.map((event) => (
                            <div
                                key={event.id}
                                className="calendar-event"
                            >
                                <div>
                                    <strong>
                                        {event.title}
                                    </strong>

                                    <span>
                                        {event.date} ·{" "}
                                        {event.time}
                                    </span>

                                    {event.location && (
                                        <span>
                                            {
                                                event.location
                                            }
                                        </span>
                                    )}
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        deleteEvent(
                                            event.id
                                        )
                                    }
                                    title="Eliminar evento"
                                >
                                    🗑️
                                </button>
                            </div>
                        ))}

                    {eventError && (
                        <p className="calendar-panel__error">
                            {eventError}
                        </p>
                    )}
                </section>
            )}

            <section className="mobile-chat__input">
                <div className="mobile-chat__actions">
                    <button
                        type="button"
                        onClick={openAddEvent}
                        title="Añadir evento"
                    >
                        +
                    </button>

                    <button
                        type="button"
                        onClick={openCalendar}
                        title="Gestionar calendario"
                    >
                        📅
                    </button>
                </div>

                <div className="mobile-chat__message-input">
                    <input
                        type="text"
                        value={message}
                        onChange={(event) =>
                            setMessage(
                                event.target.value
                            )
                        }
                        onKeyDown={handleKeyDown}
                        placeholder="Habla con Luna..."
                        disabled={loading}
                    />

                    <button
                        type="button"
                        onClick={sendMessage}
                        disabled={
                            loading ||
                            !message.trim()
                        }
                    >
                        {loading
                            ? "..."
                            : "Enviar"}
                    </button>
                </div>
            </section>
        </main>
    );
}
