import { useClock } from "../../hooks/useClock";

import WidgetContainer from "../../components/ui/WidgetContainer/WidgetContainer";

export default function ClockWidget() {

    const now = useClock();

    const time = now.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
    });

    const date = now.toLocaleDateString("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long",
    });

    return (
        <WidgetContainer>

            <h1 className="text-8xl font-thin leading-none tracking-tight">
                {time}
            </h1>

            <p className="mt-3 text-xl text-white/50 capitalize">
                {date}
            </p>

        </WidgetContainer>
    );
}