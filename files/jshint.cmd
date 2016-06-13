@echo off
setlocal

set argc=0
for %%x in (%*) do set /A argc+=1
if %argc% neq 1 (
	echo Invalid number of arguments 1>&2
	goto exit_err
)
if not exist %1 (
	echo Unable to find the file %1 1>&2
	goto exit_err
)
if exist "%~dpnx1\*.*" (
	echo %1 is a directory: we work only with files 1>&2
	goto exit_err
)

pushd "%~dp1"
if %errorlevel% neq 0 (
	echo Unable to change dir to "%~dp1" 1>&2
	goto exit_err
)

call jshint.cmd --verbose "%~nx1"
set rc=%errorlevel%

popd

if %rc% equ 0 (
	echo All good!
	echo.
	echo PS: for better debugging, your file should start with:
	echo /* jshint unused:vars, undef:true */
)

endlocal
exit /B 0

:exit_err
endlocal
exit /B 1
