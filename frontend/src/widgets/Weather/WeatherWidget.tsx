import { useEffect, useState } from "react";

import GlassCard from "../../components/ui/GlassCard/GlassCard";
import SectionTitle from "../../components/ui/SectionTitle/SectionTitle";
import { API_URL } from "../../config";

interface WeatherData {
    location: string;
    temperature: number;
    description: string;
    weather_code: number;
}

export default function WeatherWidget() {
    const [weather, setWeather] =
        useState<WeatherData | null>(null);

    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(
                    `${API_URL}/weather`
                );

                if (!response.ok) {
                    throw new Error(
                        "Error fetching weather"
                    );
                }

                const data: WeatherData =
                    await response.json();

                setWeather(data);
                setError(false);
            } catch (error) {
                console.error(
                    "Weather error:",
                    error
                );

                setError(true);
            }
        };

        fetchWeather();

        const interval = setInterval(
            fetchWeather,
            10 * 60 * 1000
        );

        return () => clearInterval(interval);
    }, []);

    const getWeatherIcon = (code: number) => {
        if (code === 0) return "☀️";
        if (code <= 3) return "⛅";
        if (code <= 48) return "🌫️";
        if (code <= 67) return "🌧️";
        if (code <= 77) return "❄️";
        if (code <= 82) return "🌦️";
        if (code <= 99) return "⛈️";

        return "🌤️";
    };

    return (
        <GlassCard>
            <SectionTitle title="Clima" />

            {error && (
                <p className="text-white/60">
                    No se pudo obtener el clima
                </p>
            )}

            {!weather && !error && (
                <p className="text-white/60">
                    Cargando clima...
                </p>
            )}

            {weather && !error && (
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-white/50 text-sm mb-1">
                            {weather.location}
                        </p>

                        <p className="text-5xl font-light">
                            {Math.round(weather.temperature)}°
                        </p>

                        <p className="text-white/60">
                            {weather.description}
                        </p>
                    </div>

                    <div className="text-6xl">
                        {getWeatherIcon(
                            weather.weather_code
                        )}
                    </div>
                </div>
            )}
        </GlassCard>
    );
}
