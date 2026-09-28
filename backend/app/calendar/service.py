from datetime import datetime

from app.calendar.database import get_connection, init_database
from app.calendar.models import CalendarEvent


init_database()

def create_event(
    title: str,
    date: str,
    time: str,
    location: str | None = None,
    notes: str | None = None,
):
    created_at = datetime.now().isoformat()

    connection = get_connection()

    cursor = connection.execute(
        """
        INSERT INTO events (
            title,
            date,
            time,
            location,
            notes,
            created_at
        )
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        (
            title,
            date,
            time,
            location,
            notes,
            created_at,
        ),
    )

    connection.commit()

    event_id = cursor.lastrowid

    connection.close()

    return get_event(event_id)


def get_event(event_id: int):
    connection = get_connection()

    row = connection.execute(
        """
        SELECT *
        FROM events
        WHERE id = ?
        """,
        (event_id,),
    ).fetchone()

    connection.close()

    if row is None:
        return None

    return CalendarEvent(
        id=row["id"],
        title=row["title"],
        date=row["date"],
        time=row["time"],
        location=row["location"],
        notes=row["notes"],
        created_at=row["created_at"],
    )


def get_events():
    connection = get_connection()

    rows = connection.execute(
        """
        SELECT *
        FROM events
        ORDER BY date ASC, time ASC
        """
    ).fetchall()

    connection.close()

    return [
        CalendarEvent(
            id=row["id"],
            title=row["title"],
            date=row["date"],
            time=row["time"],
            location=row["location"],
            notes=row["notes"],
            created_at=row["created_at"],
        )
        for row in rows
    ]


def delete_event(event_id: int):
    connection = get_connection()

    cursor = connection.execute(
        """
        DELETE FROM events
        WHERE id = ?
        """,
        (event_id,),
    )

    connection.commit()

    deleted = cursor.rowcount > 0

    connection.close()

    return deleted