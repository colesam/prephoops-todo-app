#!/bin/bash

# Laravel data setup
php ./backend/artisan migrate
php ./backend/artisan passport:install --force
php ./backend/artisan db:seed
