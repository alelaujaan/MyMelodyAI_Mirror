import { useEffect, useState } from "react";

import GlassCard from "../../components/ui/GlassCard/GlassCard";
import SectionTitle from "../../components/ui/SectionTitle/SectionTitle";
import { API_URL } from "../../config";

type NewsItem = {
    title: string;
    link: string;
    published: string;
};

export default function NewsWidget() {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadNews = async () => {
            try {
                const response = await fetch(
                    `${API_URL}/news`
                );

                if (!response.ok) {
                    throw new Error("Error loading news");
                }

                const data = await response.json();
                setNews(data);
            } catch (error) {
                console.error(
                    "🔴 Error loading news:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        loadNews();

        const interval = setInterval(
            loadNews,
            10 * 60 * 1000
        );

        return () => clearInterval(interval);
    }, []);

    return (
        <GlassCard>
            <SectionTitle title="Noticias" />

            {loading && (
                <p className="text-white/60">
                    Cargando noticias...
                </p>
            )}

            {!loading && news.length === 0 && (
                <p className="text-white/60">
                    No hay noticias disponibles.
                </p>
            )}

            <div className="space-y-3">
                {news.map((item, index) => (
                    <a
                        key={`${item.link}-${index}`}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block border-b border-white/10 pb-3 last:border-0"
                    >
                        <p className="text-sm leading-snug">
                            {item.title}
                        </p>

                        {item.published && (
                            <p className="mt-1 text-xs text-white/40">
                                {item.published}
                            </p>
                        )}
                    </a>
                ))}
            </div>
        </GlassCard>
    );
}
