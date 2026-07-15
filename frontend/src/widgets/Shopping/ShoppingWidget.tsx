import GlassCard from "../../components/ui/GlassCard/GlassCard";
import SectionTitle from "../../components/ui/SectionTitle/SectionTitle";

export default function ShoppingWidget() {

    return (

        <GlassCard>

            <SectionTitle title="Lista de compra" />

            <ul className="space-y-2">

                <li>✅ Leche</li>

                <li>✅ Café</li>

                <li>⬜ Pan</li>

            </ul>

        </GlassCard>

    );

}