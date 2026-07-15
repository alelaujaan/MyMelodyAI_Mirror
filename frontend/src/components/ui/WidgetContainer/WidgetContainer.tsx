type Props = {
    children: React.ReactNode;
    className?: string;
};

export default function WidgetContainer({
    children,
    className = "",
}: Props) {
    return (
        <section
            className={`
                flex
                flex-col
                justify-center
                ${className}
            `}
        >
            {children}
        </section>
    );
}