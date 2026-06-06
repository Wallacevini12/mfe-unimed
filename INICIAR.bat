@echo off
title Unimed MFE - Iniciando...
color 0A

echo.
echo  =============================================
echo   UNIMED - Sistema de Agendamento
echo   Iniciando os microfrontends...
echo  =============================================
echo.

:: Verificar Node.js
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo  [ERRO] Node.js nao encontrado!
    echo  Acesse https://nodejs.org e instale a versao LTS.
    pause
    exit /b 1
)

echo  [OK] Node.js encontrado.
echo.

:: Instalar dependencias do mfe-agendamento
echo  [1/6] Instalando dependencias do mfe-agendamento...
cd /d "%~dp0mfe-agendamento"
call npm install --silent
echo  [OK] mfe-agendamento instalado.

:: Instalar dependencias do mfe-notificacao
echo  [2/6] Instalando dependencias do mfe-notificacao...
cd /d "%~dp0mfe-notificacao"
call npm install --silent
echo  [OK] mfe-notificacao instalado.

:: Instalar dependencias do shell
echo  [3/6] Instalando dependencias do shell...
cd /d "%~dp0shell"
call npm install --silent
echo  [OK] shell instalado.

:: Build do mfe-agendamento
echo  [4/6] Compilando mfe-agendamento...
cd /d "%~dp0mfe-agendamento"
call npm run build
echo  [OK] mfe-agendamento compilado.

:: Build do mfe-notificacao
echo  [5/6] Compilando mfe-notificacao...
cd /d "%~dp0mfe-notificacao"
call npm run build
echo  [OK] mfe-notificacao compilado.

echo.
echo  [6/6] Iniciando os servidores...
echo.

:: Iniciar mfe-agendamento em preview (porta 5001)
start "MFE Agendamento - porta 5001" cmd /k "cd /d "%~dp0mfe-agendamento" && npm run preview && pause"

:: Aguardar 3 segundos
timeout /t 3 /nobreak >nul

:: Iniciar mfe-notificacao em preview (porta 5002)
start "MFE Notificacao - porta 5002" cmd /k "cd /d "%~dp0mfe-notificacao" && npm run preview && pause"

:: Aguardar 3 segundos
timeout /t 3 /nobreak >nul

:: Iniciar shell em dev (porta 5000)
start "Shell - porta 5000" cmd /k "cd /d "%~dp0shell" && npm run dev && pause"

:: Aguardar shell subir
timeout /t 5 /nobreak >nul

echo.
echo  =============================================
echo   Tudo pronto! Abrindo o navegador...
echo   URL: http://localhost:5000
echo  =============================================
echo.

:: Abrir navegador automaticamente
start "" "http://localhost:5000"

echo  Pressione qualquer tecla para fechar esta janela.
echo  (Os servidores continuam rodando nas outras janelas)
pause >nul
