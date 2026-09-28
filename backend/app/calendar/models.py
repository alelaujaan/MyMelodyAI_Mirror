from dataclasses import dataclass
from typing import Optional


@dataclass
class CalendarEvent:
    id: Optional[int]
    title: str
    date: str
    time: str
    location: Optional[str] = None
    notes: Optional[str] = None
    created_at: Optional[str] = None