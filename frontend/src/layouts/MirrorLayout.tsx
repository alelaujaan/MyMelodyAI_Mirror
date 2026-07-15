type MirrorLayoutProps = {
    children: React.ReactNode;
};

export default function MirrorLayout({ children }: MirrorLayoutProps) {
    return (
        <div className="w-screen h-screen bg-black text-white overflow-hidden">
            {children}
        </div>
    );
}