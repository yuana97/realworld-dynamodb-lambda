#!/usr/bin/env bash
# set execution print mode
set -x
# get server pids
SERVER_PIDS=`lsof -ti:3000 -ti:8000`
# server pids not empty => run kill pids
if [ -n "$SERVER_PIDS" ]; then
  kill $SERVER_PIDS
fi
