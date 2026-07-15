import GlassCard from "../../components/ui/GlassCard/GlassCard";
import SectionTitle from "../../components/ui/SectionTitle/SectionTitle";

export default function CalendarWidget() {

    return (

        <GlassCard>

            <SectionTitle title="Próximo evento" />

            <p className="text-xl">
                Dentista
            </p>

            <p className="text-white/60">
                Hoy · 09:30
            </p>

        </GlassCard>

    );

}