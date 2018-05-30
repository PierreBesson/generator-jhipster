#!/bin/sh
# Npm Wrapper script
# Use gradle to manage the local node and npm versions
sh gradlew npmw -PyarnArgs="$@"
