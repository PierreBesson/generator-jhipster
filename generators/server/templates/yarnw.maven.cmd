:: Yarn Wrapper script
:: Use maven to manage the local node and yarn versions
@echo off
setlocal
set PATH=%~dp0node/;%PATH%
if not exist %~dp0node/ (
    call mvnw.cmd com.github.eirslett:frontend-maven-plugin:install-node-and-yarn
)
call node/yarn/dist/bin/yarn.cmd %*
@echo on