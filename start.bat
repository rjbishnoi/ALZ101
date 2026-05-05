@echo off
REM ============================================================
REM start.bat - run NeuroViz locally on Windows
REM ============================================================
REM Double-click this file in File Explorer, or from Command Prompt:
REM     start.bat
REM ============================================================

cd /d "%~dp0"

if not exist "index.html" (
  echo ERROR: index.html not found in this folder.
  echo Make sure start.bat sits in the same folder as index.html.
  pause
  exit /b 1
)

set PORT=8765

echo.
echo ============================================================
echo   NeuroViz - Cognitive Health Atlas
echo ============================================================
echo   Folder:  %CD%
echo   URL:     http://localhost:%PORT%/
echo.
echo   The browser will open in 2 seconds.
echo   Press Ctrl+C in this window to stop the server.
echo ============================================================
echo.

REM Open browser after short delay
start "" /min cmd /c "timeout /t 2 /nobreak >nul && start http://localhost:%PORT%/"

REM Try python3 first, then python
where python3 >nul 2>nul
if %errorlevel%==0 (
  python3 -m http.server %PORT%
  goto :eof
)
where python >nul 2>nul
if %errorlevel%==0 (
  python -m http.server %PORT%
  goto :eof
)

echo ERROR: Python is required. Install from python.org and try again.
pause
