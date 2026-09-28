import { useEffect, useState } from "react";

import GlassCard from "../../components/ui/GlassCard/GlassCard";
import SectionTitle from "../../components/ui/SectionTitle/SectionTitle";

type CalendarEvent = {
    id: number;
    title: string;
    date: string;
    time: string;
    location?: string | null;
    notes?: string | null;
    created_at?: string | null;
};

export default function CalendarWidget() {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const loadEvents = async (showLoading = false) => {
        try {
            if (showLoading) {
                setLoading(true);
            }

            setError(false);

            const response = await fetch(
                "http://localhost:8000/api/v1/calendar"
            );

            if (!response.ok) {
                throw new Error("Error al obtener eventos");
            }

            const data: CalendarEvent[] = await response.json();

            setEvents(data);
        } catch (err) {
            console.error("Error cargando calendario:", err);
            setError(true);
        } finally {
            if (showLoading) {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        // Carga inicial
        loadEvents(true);

        // Actualizar automáticamente cada 10 segundos
        const interval = setInterval(() => {
            loadEvents(false);
        }, 10_000);

        return () => clearInterval(interval);
    }, []);

    const formatDate = (date: string) => {
        const parsedDate = new Date(`${date}T00:00:00`);

        return parsedDate.toLocaleDateString("es-ES", {
            weekday: "short",
            day: "numeric",
            month: "short",
        });
    };

    return (
        <GlassCard>
            <SectionTitle title="Calendario" />

            {loading && (
                <p className="text-white/60">
                    Cargando eventos...
                </p>
            )}

            {error && (
                <p className="text-red-300">
                    No se pudo cargar el calendario.
                </p>
            )}

            {!loading && !error && events.length === 0 && (
                <p className="text-white/60">
                    No tienes eventos próximos.
                </p>
            )}

            {!loading && !error && events.length > 0 && (
                <div className="space-y-3">
                    {events.slice(0, 3).map((event) => (
                        <div
                            key={event.id}
                            className="rounded-xl bg-white/5 px-4 py-3"
                        >
                            <p className="text-xl">
                                {event.title}
                            </p>

                            <p className="text-white/60">
                                {formatDate(event.date)} · {event.time}
                            </p>

                            {event.location && (
                                <p className="text-sm text-white/40">
                                    {event.location}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </GlassCard>
    );
}