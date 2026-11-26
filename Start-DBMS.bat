@echo off
cd /d "%~dp0"
if not exist public\vendor\sql-wasm.wasm (
  call npm install --no-audit --no-fund || goto error
  call npm run build || goto error
)
start "" http://localhost:5173
node server.js
pause
exit /b
:error
echo Setup failed. Check Node.js and internet connection, then retry.
pause
