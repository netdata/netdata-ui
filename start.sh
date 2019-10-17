#!/bin/bash

PORT=${PORT:-6006}
echo Will listen on port ${PORT}
start-storybook -p $PORT