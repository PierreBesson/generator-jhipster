#!/bin/sh
:: Npm Wrapper script
:: Use gradle to manage the local node and npm versions
@echo off
setlocal
call gradlew.bat npmw -PnpmArgs="$@"
@echo on