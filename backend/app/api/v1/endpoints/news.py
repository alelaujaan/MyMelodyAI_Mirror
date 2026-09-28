import feedparser

from fastapi import APIRouter

router = APIRouter()


RSS_FEEDS = [
    "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/espana/portada",
    "https://www.rtve.es/rss/temas_noticias.xml",
]


@router.get("")
def get_news():
    news = []

    for feed_url in RSS_FEEDS:
        feed = feedparser.parse(feed_url)

        for entry in feed.entries[:5]:
            news.append(
                {
                    "title": entry.get("title", ""),
                    "link": entry.get("link", ""),
                    "published": entry.get("published", ""),
                }
            )

    return news[:8]