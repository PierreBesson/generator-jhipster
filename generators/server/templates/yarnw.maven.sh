#!/bin/sh
# Yarn Wrapper script
# Use maven to manage the local node and yarn versions
PATH="$PWD/node/":$PATH
if [ ! -d node ]; then
  sh mvnw com.github.eirslett:frontend-maven-plugin:install-node-and-yarn
fi
"node/yarn/dist/bin/yarn" "$@"
