#!/bin/sh
# Npm Wrapper script
# Use maven to manage the local node and npm versions
PATH="$PWD/node/":$PATH
if [ ! -d node ]; then
  sh mvnw com.github.eirslett:frontend-maven-plugin:install-node-and-npm
fi
"node/npm" "$@"
