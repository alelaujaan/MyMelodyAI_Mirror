#include <Arduino.h>

// ============================================================
// MyMelodyAI - ESP32-S3 Lighting Controller
// PRUEBA: MOSFET ON/OFF SIN PWM
// ============================================================

// -------------------------
// BOTONES
// -------------------------
const int BUTTON_POWER = 1;
const int BUTTON_BRIGHT_UP = 2;
const int BUTTON_BRIGHT_DOWN = 42;
const int BUTTON_WARMER = 41;
const int BUTTON_COOLER = 40;
const int BUTTON_MIRROR = 39;

// -------------------------
// MOSFET
// -------------------------
const int MOSFET_WARM = 35;
const int MOSFET_COOL = 36;

// -------------------------
// ESTADO
// -------------------------
bool lightsOn = true;

int brightness = 50;  // Se mantiene para la interfaz
int cct = 50;         // 0 = warm, 50 = neutral, 100 = cool

// -------------------------
// BOTONES
// -------------------------
bool lastPowerState = HIGH;
bool lastBrightUpState = HIGH;
bool lastBrightDownState = HIGH;
bool lastWarmerState = HIGH;
bool lastCoolerState = HIGH;
bool lastMirrorState = HIGH;

unsigned long lastButtonTime = 0;
const unsigned long DEBOUNCE_TIME = 80;

// ============================================================
// ACTUALIZAR ILUMINACIÓN
// ============================================================

void updateLighting()
{
    bool warmOn = false;
    bool coolOn = false;

    if (lightsOn)
    {
        // En esta prueba no usamos PWM.
        // Encendemos/apagamos cada canal según el CCT.

        if (cct < 50)
        {
            // Más cálido
            warmOn = true;
            coolOn = false;
        }
        else if (cct > 50)
        {
            // Más frío
            warmOn = false;
            coolOn = true;
        }
        else
        {
            // CCT 50 = ambos canales encendidos
            warmOn = true;
            coolOn = true;
        }
    }

    // IMPORTANTE:
    // El sketch anterior necesitó PWM invertido.
    // Por tanto mantenemos la lógica invertida:
    //
    // LOW  = MOSFET ON
    // HIGH = MOSFET OFF

    digitalWrite(MOSFET_WARM, warmOn ? LOW : HIGH);
    digitalWrite(MOSFET_COOL, coolOn ? LOW : HIGH);

    Serial.println();
    Serial.println("------------------------------");

    Serial.print("LED: ");
    Serial.println(lightsOn ? "ON" : "OFF");

    Serial.print("BRILLO: ");
    Serial.print(brightness);
    Serial.println("%");

    Serial.print("CCT: ");
    Serial.print(cct);
    Serial.println("%");

    Serial.print("WARM: ");
    Serial.println(warmOn ? "ON" : "OFF");

    Serial.print("COOL: ");
    Serial.println(coolOn ? "ON" : "OFF");

    Serial.println("------------------------------");
}

// ============================================================
// SETUP
// ============================================================

void setup()
{
    Serial.begin(115200);
    delay(1000);

    // MOSFET como salidas digitales
    pinMode(MOSFET_WARM, OUTPUT);
    pinMode(MOSFET_COOL, OUTPUT);

    // Arrancar ambos apagados
    digitalWrite(MOSFET_WARM, HIGH);
    digitalWrite(MOSFET_COOL, HIGH);

    // Botones
    pinMode(BUTTON_POWER, INPUT_PULLUP);
    pinMode(BUTTON_BRIGHT_UP, INPUT_PULLUP);
    pinMode(BUTTON_BRIGHT_DOWN, INPUT_PULLUP);
    pinMode(BUTTON_WARMER, INPUT_PULLUP);
    pinMode(BUTTON_COOLER, INPUT_PULLUP);
    pinMode(BUTTON_MIRROR, INPUT_PULLUP);

    lastPowerState = digitalRead(BUTTON_POWER);
    lastBrightUpState = digitalRead(BUTTON_BRIGHT_UP);
    lastBrightDownState = digitalRead(BUTTON_BRIGHT_DOWN);
    lastWarmerState = digitalRead(BUTTON_WARMER);
    lastCoolerState = digitalRead(BUTTON_COOLER);
    lastMirrorState = digitalRead(BUTTON_MIRROR);

    updateLighting();

    Serial.println();
    Serial.println("=================================");
    Serial.println(" MyMelodyAI - MOSFET ON/OFF TEST");
    Serial.println("=================================");
    Serial.println("SIN PWM");
    Serial.println();
    Serial.println("GPIO 35 -> WARM MOSFET");
    Serial.println("GPIO 36 -> COOL MOSFET");
    Serial.println();
}

// ============================================================
// LOOP
// ============================================================

void loop()
{
    bool powerState = digitalRead(BUTTON_POWER);
    bool brightUpState = digitalRead(BUTTON_BRIGHT_UP);
    bool brightDownState = digitalRead(BUTTON_BRIGHT_DOWN);
    bool warmerState = digitalRead(BUTTON_WARMER);
    bool coolerState = digitalRead(BUTTON_COOLER);
    bool mirrorState = digitalRead(BUTTON_MIRROR);

    // -------------------------
    // POWER
    // -------------------------
    if (lastPowerState == HIGH &&
        powerState == LOW &&
        millis() - lastButtonTime > DEBOUNCE_TIME)
    {
        lightsOn = !lightsOn;

        Serial.println();
        Serial.println(">>> BOTON POWER");

        updateLighting();

        lastButtonTime = millis();
    }

    // -------------------------
    // BRILLO +
    // -------------------------
    if (lastBrightUpState == HIGH &&
        brightUpState == LOW &&
        millis() - lastButtonTime > DEBOUNCE_TIME)
    {
        brightness += 10;

        if (brightness > 100)
        {
            brightness = 100;
        }

        Serial.println();
        Serial.println(">>> BOTON BRILLO +");

        updateLighting();

        lastButtonTime = millis();
    }

    // -------------------------
    // BRILLO -
    // -------------------------
    if (lastBrightDownState == HIGH &&
        brightDownState == LOW &&
        millis() - lastButtonTime > DEBOUNCE_TIME)
    {
        brightness -= 10;

        if (brightness < 0)
        {
            brightness = 0;
        }

        Serial.println();
        Serial.println(">>> BOTON BRILLO -");

        updateLighting();

        lastButtonTime = millis();
    }

    // -------------------------
    // CCT WARMER
    // -------------------------
    if (lastWarmerState == HIGH &&
        warmerState == LOW &&
        millis() - lastButtonTime > DEBOUNCE_TIME)
    {
        cct -= 10;

        if (cct < 0)
        {
            cct = 0;
        }

        Serial.println();
        Serial.println(">>> BOTON CCT WARMER");

        updateLighting();

        lastButtonTime = millis();
    }

    // -------------------------
    // CCT COOLER
    // -------------------------
    if (lastCoolerState == HIGH &&
        coolerState == LOW &&
        millis() - lastButtonTime > DEBOUNCE_TIME)
    {
        cct += 10;

        if (cct > 100)
        {
            cct = 100;
        }

        Serial.println();
        Serial.println(">>> BOTON CCT COOLER");

        updateLighting();

        lastButtonTime = millis();
    }

    // -------------------------
    // MIRROR CONTROL
    // -------------------------
    if (lastMirrorState == HIGH &&
        mirrorState == LOW &&
        millis() - lastButtonTime > DEBOUNCE_TIME)
    {
        Serial.println();
        Serial.println(">>> MIRROR_CONTROL");

        lastButtonTime = millis();
    }

    // -------------------------
    // GUARDAR ESTADOS
    // -------------------------
    lastPowerState = powerState;
    lastBrightUpState = brightUpState;
    lastBrightDownState = brightDownState;
    lastWarmerState = warmerState;
    lastCoolerState = coolerState;
    lastMirrorState = mirrorState;

    delay(5);
}