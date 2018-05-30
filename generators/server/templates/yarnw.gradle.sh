#!/bin/sh
# Yarn Wrapper script
# Use gradle to manage the local node and yarn versions
sh gradlew yarnw -PyarnArgs="$@"
