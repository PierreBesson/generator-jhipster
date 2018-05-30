:: Npm Wrapper script
:: Use maven to manage the local node and npm versions
@echo off
setlocal
set PATH=%~dp0node/;%PATH%
if not exist %~dp0node/ (
    call mvnw.cmd com.github.eirslett:frontend-maven-plugin:install-node-and-yarn
)
call node/npm.cmd %*
@echo on