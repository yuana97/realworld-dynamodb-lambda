#!/usr/bin/env bash
# set -x enables mode of the shell where all executed commands are printed to terminal
set -x
# run stop-server script
./stop-server.sh

# Add JRE to path
# set jre path to relative path of java file in node_modules/node-jre
export JRE_PATH=`find node_modules/node-jre -type f -name java`
# truncate last slash off jre path
export JRE_PATH=`dirname $JRE_PATH`
# get pwd + jrepath to get full jrepath
export JRE_PATH=`pwd`/$JRE_PATH
# append this directory in front of existing path
export PATH=$JRE_PATH:$PATH
# set mode: exit immediately on nonzero status code
set -e
# make sure we have java installed and java commands can run
which java
java -version

# Start local dynamodb and offline plugins
# export dummy aws creds as env vars
export AWS_ACCESS_KEY_ID=foo
export AWS_SECRET_ACCESS_KEY=bar
# start offline ddb and run migrations
serverless dynamodb start --migrate &
sleep 5
# run serverless offline
nyc serverless offline &
sleep 5
