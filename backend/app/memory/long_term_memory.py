import sqlite3

from app.memory.conversation_database import conversation_database


class LongTermMemory:

    def __init__(self) -> None:

        self.database_path = (
            conversation_database.database_path
        )

        self._create_table()

    def _connect(self):

        return sqlite3.connect(
            self.database_path
        )

    def _create_table(self):

        with self._connect() as connection:

            connection.execute(
                """
                CREATE TABLE IF NOT EXISTS memories (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    key TEXT NOT NULL UNIQUE,
                    value TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
                """
            )

            connection.commit()

    def save(
        self,
        key: str,
        value: str,
    ) -> None:

        with self._connect() as connection:

            connection.execute(
                """
                INSERT INTO memories (
                    key,
                    value
                )
                VALUES (?, ?)
                ON CONFLICT(key)
                DO UPDATE SET
                    value = excluded.value,
                    updated_at = CURRENT_TIMESTAMP
                """,
                (
                    key,
                    value,
                ),
            )

            connection.commit()

    def get(
        self,
        key: str,
    ) -> str | None:

        with self._connect() as connection:

            cursor = connection.execute(
                """
                SELECT value
                FROM memories
                WHERE key = ?
                """,
                (key,),
            )

            row = cursor.fetchone()

        if row is None:
            return None

        return row[0]

    def get_all(self):

        with self._connect() as connection:

            cursor = connection.execute(
                """
                SELECT key, value
                FROM memories
                ORDER BY updated_at DESC
                """
            )

            rows = cursor.fetchall()

        return [
            {
                "key": key,
                "value": value,
            }
            for key, value in rows
        ]

    def delete(
        self,
        key: str,
    ) -> None:

        with self._connect() as connection:

            connection.execute(
                """
                DELETE FROM memories
                WHERE key = ?
                """,
                (key,),
            )

            connection.commit()

    def clear(self) -> None:

        with self._connect() as connection:

            connection.execute(
                "DELETE FROM memories"
            )

            connection.commit()


long_term_memory = LongTermMemory()