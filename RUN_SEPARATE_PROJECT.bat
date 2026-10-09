@echo off
title Patent Forms Standalone Project - Port 5000
echo ================================================================
echo   Brainiac IP Solutions - Standalone Patent Forms Module
echo   Starting Standalone Server on http://localhost:5000 ...
echo ================================================================
cd /d "%~dp0"
start "" http://localhost:5000
node server.js
pause
