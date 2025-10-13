@echo off
echo ========================================
echo Limpiando cache del navegador
echo ========================================

echo.
echo Limpiando Google Chrome...
rd /s /q "%LOCALAPPDATA%\Google\Chrome\User Data\Default\Cache" 2>nul
rd /s /q "%LOCALAPPDATA%\Google\Chrome\User Data\Default\Code Cache" 2>nul
rd /s /q "%LOCALAPPDATA%\Google\Chrome\User Data\Default\Service Worker\CacheStorage" 2>nul

echo.
echo Limpiando Microsoft Edge...
rd /s /q "%LOCALAPPDATA%\Microsoft\Edge\User Data\Default\Cache" 2>nul
rd /s /q "%LOCALAPPDATA%\Microsoft\Edge\User Data\Default\Code Cache" 2>nul
rd /s /q "%LOCALAPPDATA%\Microsoft\Edge\User Data\Default\Service Worker\CacheStorage" 2>nul

echo.
echo Limpiando Firefox...
rd /s /q "%APPDATA%\Mozilla\Firefox\Profiles\*\cache2" 2>nul

echo.
echo ========================================
echo Cache limpiada!
echo Ahora abre el navegador e intenta de nuevo
echo ========================================
pause
