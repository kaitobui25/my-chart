@echo off
setlocal
title KLineCharts - Pull, Type Check, Debug

cd /d "%~dp0"

echo.
echo [1/3] Pulling latest main branch...
git pull origin main
if errorlevel 1 goto :failed

echo.
echo [2/3] Running TypeScript type check...
call pnpm type-check
if errorlevel 1 goto :failed

echo.
echo [3/3] Starting debug server...
echo Press Ctrl+C to stop.
echo.
call pnpm debug
if errorlevel 1 goto :failed

exit /b 0

:failed
set "EXIT_CODE=%ERRORLEVEL%"
echo.
echo ========================================
echo FAILED. Exit code: %EXIT_CODE%
echo Check the error message above.
echo ========================================
echo.
pause
exit /b %EXIT_CODE%
