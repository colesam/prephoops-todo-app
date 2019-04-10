#!/bin/bash
# TODO: Get this script to run without sudo

cp ./backend/.env.example .env

# Docker container setup
./scripts/down
./scripts/clear
./scripts/up

sudo chmod 777 -R ./backend/storage
