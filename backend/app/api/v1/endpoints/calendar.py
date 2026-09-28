from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.calendar.service import (
    create_event,
    get_events,
    delete_event,
)


router = APIRouter()


class EventCreate(BaseModel):
    title: str
    date: str
    time: str
    location: str | None = None
    notes: str | None = None


@router.get("")
def list_events():
    return get_events()


@router.post("")
def add_event(event: EventCreate):
    if not event.title.strip():
        raise HTTPException(
            status_code=400,
            detail="El título del evento es obligatorio",
        )

    created_event = create_event(
        title=event.title,
        date=event.date,
        time=event.time,
        location=event.location,
        notes=event.notes,
    )

    return created_event


@router.delete("/{event_id}")
def remove_event(event_id: int):
    deleted = delete_event(event_id)

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Evento no encontrado",
        )

    return {
        "message": "Evento eliminado",
        "event_id": event_id,
    }