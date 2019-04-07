#!/bin/bash
# TODO: Get this script to run without sudo

# Docker container setup
./scripts/down
./scripts/clear
./scripts/up

sudo chmod 777 -R ./backend/storage