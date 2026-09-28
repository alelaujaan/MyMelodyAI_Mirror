import sqlite3
from pathlib import Path


DATABASE_PATH = Path(__file__).resolve().parent / "calendar.db"


def get_connection():
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def init_database():
    connection = get_connection()

    connection.execute(
        """
        CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            date TEXT NOT NULL,
            time TEXT NOT NULL,
            location TEXT,
            notes TEXT,
            created_at TEXT NOT NULL
        )
        """
    )

    connection.commit()
    connection.close()