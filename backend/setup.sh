#!/bin/bash

php artisan migrate
php artisan passport:install --force
php artisan db:seed
