@echo off
title MirrorAI - Project Structure Creator

echo ==========================================
echo        MirrorAI Project Bootstrap
echo ==========================================
echo.

:: Root folders
mkdir assets 2>nul
mkdir config 2>nul
mkdir data 2>nul
mkdir docs 2>nul
mkdir docker 2>nul
mkdir firmware 2>nul
mkdir hardware 2>nul
mkdir infrastructure 2>nul
mkdir scripts 2>nul

:: GitHub
mkdir .github 2>nul
mkdir .github\workflows 2>nul

:: VSCode
mkdir .vscode 2>nul

:: Data
mkdir data\database 2>nul
mkdir data\faces 2>nul
mkdir data\logs 2>nul
mkdir data\backups 2>nul

:: Docker
mkdir docker\mosquitto 2>nul
mkdir docker\mosquitto\config 2>nul
mkdir docker\mosquitto\data 2>nul
mkdir docker\mosquitto\log 2>nul

:: ============================
:: Backend
:: ============================

mkdir backend 2>nul
mkdir backend\app 2>nul

mkdir backend\app\api 2>nul
mkdir backend\app\api\v1 2>nul
mkdir backend\app\api\v1\endpoints 2>nul

mkdir backend\app\core 2>nul
mkdir backend\app\database 2>nul
mkdir backend\app\models 2>nul
mkdir backend\app\mqtt 2>nul
mkdir backend\app\repositories 2>nul
mkdir backend\app\schemas 2>nul
mkdir backend\app\services 2>nul
mkdir backend\app\state 2>nul
mkdir backend\app\utils 2>nul
mkdir backend\app\websocket 2>nul

mkdir backend\tests 2>nul

type nul > backend\app\main.py
type nul > backend\pyproject.toml
type nul > backend\Dockerfile
type nul > backend\.env.example

:: ============================
:: Frontend
:: ============================

mkdir frontend 2>nul
mkdir frontend\public 2>nul
mkdir frontend\src 2>nul

mkdir frontend\src\assets 2>nul
mkdir frontend\src\components 2>nul
mkdir frontend\src\hooks 2>nul
mkdir frontend\src\layouts 2>nul
mkdir frontend\src\pages 2>nul
mkdir frontend\src\services 2>nul
mkdir frontend\src\store 2>nul
mkdir frontend\src\styles 2>nul
mkdir frontend\src\types 2>nul

type nul > frontend\src\App.tsx
type nul > frontend\src\main.tsx
type nul > frontend\package.json
type nul > frontend\Dockerfile
type nul > frontend\.env.example

:: ============================
:: Root Files
:: ============================

type nul > .gitignore
type nul > docker-compose.yml
type nul > LICENSE

echo.
echo ==========================================
echo     MirrorAI structure created!
echo ==========================================
echo.

pause