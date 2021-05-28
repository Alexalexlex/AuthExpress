## try to use node 14v

## First of all 

npm i

## First of all include app to postgreSQL

To do it use file ./config/config.json | Set your:
    "username": "here",
    "password": "here",
    "database": "here"

## Create migration on sequelize

if you have installed global sequelize CLI, use:

sequelize db:migrate

or if not:

npx sequelize-cli db:migrate

## Find routes in ./routes/index.js

test apllication in POSTMAN to POST on /signup:

{
"first_name": "name",
"last_name": "surname",
"email": "***@gmail.com",
"password": "something",
}

then POST with /sign_in:

{
"email": "***@gmail.com",
"password": "something",
}

check /profile with GET