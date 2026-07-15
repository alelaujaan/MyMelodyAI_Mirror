type Props = {
    title: string;
};

export default function SectionTitle({ title }: Props) {
    return (
        <h2 className="mb-4 text-sm uppercase tracking-[0.25em] text-white/50">
            {title}
        </h2>
    );
}