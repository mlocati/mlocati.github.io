@echo off
setlocal

set DIR_ALIAS=C:\Dev\PHP
set DIR_SRC_PREFIX=C:\Dev\PHP
set RC=1

if [%1] == [] (
	echo Missing the PHP version
	goto done_ko
)
set NEWVERSION=%1

set DIR_SRC=%DIR_SRC_PREFIX%%NEWVERSION%

if not exist "%DIR_SRC%\php.exe" (
	echo Invalid PHP version: %NEWVERSION%
	goto done_ko
)

if exist "%DIR_ALIAS%" (
	echo|set /p=Removing previous junction... 
	junction.exe -d "%DIR_ALIAS%" >NUL 2>NUL
	if exist "%DIR_ALIAS%" (
		echo failed!
		junction.exe -d "%DIR_ALIAS%"
		goto done_ko
	)
	echo done.
)

echo|set /p=Creating junction for %NEWVERSION%... 
junction.exe "%DIR_ALIAS%" "%DIR_SRC%">NUL 2>NUL
if not exist "%DIR_SRC%\php.exe" (
	echo failed!
	junction.exe "%DIR_ALIAS%" "%DIR_SRC%"
	goto done_ko
)
echo done.

:done_ko
endlocal
exit /B 1

:done_ok
endlocal
exit /B 0
