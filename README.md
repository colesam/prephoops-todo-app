# To-Do Application Challenge

There are a lot of improvements I would have made next if this were an actual project.

## Setup

I included scripts that will setup the database I used, as well as other service like nginx, in a docker containers. This is the easiest way to preview my project. Install docker, docker-compose, and then run the following commands:

```
git clone git@github.com:colesam/prephoops-todo-app.git
cd prephoops-todo-app/backend
cp .env.example .env
composer install
php artisan key:generate
cd ..
./setup.sh
# Enter password here when prompted
./migrate.sh
cd frontend
cp src/env.example.js src/env.js
npm ci
npm start
```

These commands will clone my repository and setup the backend services in docker containers with the frontend running on localhost:3000. By default, the laravel backend is listening on localhost:9000. If this is changed you will need to modify the `frontend/env.js` file. The database is a postgresql 11 server listening on localhost:5432. The database is using user `postgres` with password `test123`. These values can be changed in `backend/.env` and in the `docker-compose.yml` file.
