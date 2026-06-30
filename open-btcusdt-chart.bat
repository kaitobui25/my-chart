@echo off
setlocal

cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is required but was not found in PATH.
  pause
  exit /b 1
)

where pnpm >nul 2>nul
if errorlevel 1 (
  echo pnpm is required but was not found in PATH.
  pause
  exit /b 1
)

if /I "%~1"=="refresh" (
  node scripts\cache-btcusdt-data.js --refresh
) else (
  node scripts\cache-btcusdt-data.js
)

if errorlevel 1 (
  echo Failed to prepare BTCUSDT cache.
  pause
  exit /b 1
)

set "PORT=5173"
set "URL=http://127.0.0.1:%PORT%/"
set "HEALTH_URL=%URL%main.js"

powershell -NoProfile -ExecutionPolicy Bypass -Command "try { $response = Invoke-WebRequest -UseBasicParsing -Uri '%HEALTH_URL%' -TimeoutSec 2; if ($response.StatusCode -eq 200 -and $response.Content -match 'BTCUSDT') { exit 0 }; exit 1 } catch { exit 1 }" >nul 2>nul
if errorlevel 1 (
  start "KLineChart BTCUSDT server" cmd /k "cd /d ""%~dp0"" && pnpm exec vite debug --host 127.0.0.1 --port %PORT% --strictPort"
  timeout /t 3 /nobreak >nul
)
start "" "%URL%"

endlocal
