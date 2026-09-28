import sqlite3
from pathlib import Path


class ConversationDatabase:

    def __init__(self):

        database_path = (
            Path(__file__).resolve().parent.parent.parent
            / "data"
            / "conversation.db"
        )

        database_path.parent.mkdir(
            parents=True,
            exist_ok=True,
        )

        self.database_path = database_path

        self._create_table()

    def _connect(self):

        return sqlite3.connect(
            self.database_path
        )

    def _create_table(self):

        with self._connect() as connection:

            connection.execute(
                """
                CREATE TABLE IF NOT EXISTS messages (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    role TEXT NOT NULL,
                    content TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
                """
            )

            connection.commit()

    def add_message(
        self,
        role: str,
        content: str,
    ):

        with self._connect() as connection:

            connection.execute(
                """
                INSERT INTO messages (
                    role,
                    content
                )
                VALUES (?, ?)
                """,
                (
                    role,
                    content,
                ),
            )

            connection.commit()

    def get_messages(
        self,
        limit: int = 20,
    ):

        with self._connect() as connection:

            cursor = connection.execute(
                """
                SELECT role, content
                FROM messages
                ORDER BY id DESC
                LIMIT ?
                """,
                (limit,),
            )

            rows = cursor.fetchall()

        rows.reverse()

        return [
            {
                "role": role,
                "content": content,
            }
            for role, content in rows
        ]

    def clear(self):

        with self._connect() as connection:

            connection.execute(
                "DELETE FROM messages"
            )

            connection.commit()


conversation_database = ConversationDatabase()