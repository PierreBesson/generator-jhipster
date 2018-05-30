:: Yarn Wrapper script
:: Use gradle to manage the local node and yarn versions
@echo off
setlocal
call gradlew.bat yarnw -PyarnArgs="$@"
@echo on