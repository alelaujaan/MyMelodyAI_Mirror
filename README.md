# 🪞 MirrorAI

> **Codename: Melody**
>
> Un espejo inteligente con IA, diseñado para funcionar **100% en local**, priorizando la privacidad, la estabilidad y una experiencia de usuario elegante.

![Status](https://img.shields.io/badge/status-en%20desarrollo-blue)
![Python](https://img.shields.io/badge/Python-3.12-green)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688)
![React](https://img.shields.io/badge/React-Frontend-61DAFB)
![ESP32](https://img.shields.io/badge/ESP32-IoT-red)
![License](https://img.shields.io/badge/license-MIT-yellow)

---

## 📖 Descripción

MirrorAI es un proyecto de **Smart Mirror** construido desde cero con una arquitectura modular.

El objetivo es crear un espejo inteligente capaz de funcionar de forma completamente autónoma en un único mini PC, sin depender de servicios en la nube ni de un servidor doméstico.

El sistema está pensado para ser:

* 🔒 Privado
* ⚡ Rápido
* 🧩 Modular
* 🎨 Elegante
* 📈 Fácil de ampliar

Aunque en el futuro podrá integrarse con Home Assistant u otros sistemas domóticos, la primera versión será completamente funcional sin ellos.

---

# ✨ Características principales

* Reconocimiento facial completamente local
* Interfaz moderna y minimalista
* Avatar animado con personalidad
* Hora y fecha
* Clima
* Calendario
* Recordatorios
* Lista de la compra
* Mensajes personalizados
* Modo maquillaje
* Modo noche
* Modo privacidad
* Control de iluminación LED
* Sensor de presencia
* Ajuste automático de brillo
* Funcionamiento sin conexión a Internet
* Arquitectura preparada para futuras ampliaciones

---

# 🏗 Arquitectura

```text
                   Internet (Opcional)
                           │
      ┌────────────────────┴────────────────────┐
      │                                         │
 Weather API                             Calendar Sync
      │                                         │
      └────────────────────┬────────────────────┘
                           │
──────────────────────────────────────────────────────────

                 HP Thin Client T620+

        Ubuntu Server + Openbox + Chromium

                    React Frontend
                           │
                  REST / WebSocket
                           │
                      FastAPI Backend
                           │
       ┌──────────────┬──────────────┬──────────────┐
       │              │              │              │
   SQLite        MQTT Client    Face Engine    Display
       │
       ▼
 Mosquitto Broker
       │
       ▼
     ESP32-S3
       │
 ┌─────┼─────────────────────────────────────┐
 │     │      │        │        │            │
 LEDs  mmWave Botones  Cámara*  Micrófono*   Sensores

(*Gestionados desde el Mini PC)
```

---

# 🛡 Filosofía del proyecto

## Offline First

El espejo debe seguir funcionando aunque no exista conexión a Internet.

Solo dependerán de Internet funciones como:

* Clima
* Sincronización del calendario
* Actualizaciones

---

## Privacy First

MirrorAI nunca enviará:

* Imágenes
* Vídeo
* Audio
* Embeddings faciales

Todo el procesamiento se realiza localmente.

---

## Modularidad

Cada componente es independiente.

Si se desactiva el reconocimiento facial, el espejo seguirá funcionando.

Si desaparece MQTT, la interfaz seguirá funcionando.

Si se elimina el asistente IA, el resto del sistema seguirá operativo.

---

## Simplicidad

Cada módulo tiene una única responsabilidad.

El objetivo es mantener un código limpio, mantenible y fácil de ampliar.

---

# 📂 Estructura del proyecto

```text
MirrorAI/

├── backend/
├── frontend/
├── firmware/
├── hardware/
├── infrastructure/
├── docker/
├── assets/
├── scripts/
├── docs/
├── tests/
├── .github/
├── .vscode/
├── README.md
└── LICENSE
```

---

# 🧰 Stack tecnológico

## Backend

* Python 3.12
* FastAPI
* SQLAlchemy
* Pydantic
* Alembic
* OpenCV
* InsightFace
* Paho MQTT
* SQLite

## Frontend

* React
* TypeScript
* Vite
* TailwindCSS
* Framer Motion

## Hardware

* ESP32-S3
* HLK-LD2450
* BH1750
* Cámara USB
* LEDs RGB+CCT
* Pulsadores físicos

## Sistema

* Ubuntu Server 24.04 LTS
* Openbox
* Chromium Kiosk
* Mosquitto MQTT
* Docker
* systemd

---

# 🚀 Roadmap

## MVP

* [ ] Arquitectura
* [ ] Backend
* [ ] Frontend
* [ ] MQTT
* [ ] SQLite
* [ ] Interfaz básica

## Hardware

* [ ] ESP32
* [ ] Sensor mmWave
* [ ] LEDs
* [ ] Cámara
* [ ] Pantalla

## Reconocimiento facial

* [ ] Registro de usuarios
* [ ] Identificación local
* [ ] Perfil personalizado

## Voz

* [ ] Piper
* [ ] Whisper
* [ ] Wake Word

## IA

* [ ] Integración con Ollama
* [ ] Asistente local
* [ ] Conversaciones

## Futuro

* [ ] Home Assistant
* [ ] Integración domótica
* [ ] Multiusuario
* [ ] Plugins

---

# 🎯 Objetivos

* Arranque automático tras un corte eléctrico
* Sin intervención del usuario
* Consumo reducido
* Alta estabilidad
* Interfaz elegante
* Fácil mantenimiento
* Código limpio y documentado

---

# 🤝 Contribución

Aunque este proyecto nace como un regalo personal, está diseñado siguiendo buenas prácticas de ingeniería de software y podrá evolucionar como proyecto de código abierto en el futuro.

---

# 📅 Estado del proyecto

Actualmente en desarrollo.

**Versión objetivo:** `v1.0`

**Fecha prevista de lanzamiento:** **28 de septiembre de 2026**

---

# ❤️ Motivación

MirrorAI nace con un doble objetivo:

1. Crear un regalo único y personal.
2. Servir como proyecto de aprendizaje y portfolio, aplicando buenas prácticas de arquitectura, desarrollo backend, frontend, IoT, visión artificial e integración hardware/software.

La prioridad no es únicamente que funcione, sino construir un sistema robusto, mantenible y del que sentirse orgulloso.
