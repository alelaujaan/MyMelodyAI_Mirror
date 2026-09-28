import requests
from fastapi import APIRouter

router = APIRouter()

MADRID_LAT = 40.4168
MADRID_LON = -3.7038


@router.get("")
def get_weather():
    url = "https://api.open-meteo.com/v1/forecast"

    params = {
        "latitude": MADRID_LAT,
        "longitude": MADRID_LON,
        "current": "temperature_2m,weather_code",
        "timezone": "Europe/Madrid",
    }

    response = requests.get(url, params=params, timeout=10)
    response.raise_for_status()

    data = response.json()
    current = data["current"]

    weather_code = current["weather_code"]

    weather_description = {
        0: "Despejado",
        1: "Principalmente despejado",
        2: "Parcialmente nublado",
        3: "Nublado",
        45: "Niebla",
        48: "Niebla",
        51: "Llovizna",
        53: "Llovizna",
        55: "Llovizna",
        61: "Lluvia",
        63: "Lluvia",
        65: "Lluvia intensa",
        71: "Nieve",
        73: "Nieve",
        75: "Nieve intensa",
        80: "Chubascos",
        81: "Chubascos",
        82: "Chubascos intensos",
        95: "Tormenta",
        96: "Tormenta",
        99: "Tormenta intensa",
    }

    return {
        "location": "Madrid",
        "temperature": current["temperature_2m"],
        "unit": current["temperature_2m"],
        "weather_code": weather_code,
        "description": weather_description.get(
            weather_code,
            "Condiciones desconocidas",
        ),
    }