import GlassCard from "../../components/ui/GlassCard/GlassCard";
import SectionTitle from "../../components/ui/SectionTitle/SectionTitle";

export default function WeatherWidget() {
    return (
        <GlassCard>

            <SectionTitle title="Clima" />

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-5xl font-light">
                        24°
                    </p>

                    <p className="text-white/60">
                        Soleado
                    </p>

                </div>

                <div className="text-6xl">
                    ☀️
                </div>

            </div>

        </GlassCard>
    );
}