# ChickenAPI

ChickenAPI is an API project to perform multiple query. It also as a cool front-end. This project was created in Javascript, Typescript, HTML/CSS and SQL.

This project contain two parts :
- the api part which is the setup of the api (connexion with the database and setup of the query)
- the app part which is the front part of the project.

### ENDPOINTS
| Method | Route             | Description             | Body needed          |
| ------ | ------------------ | ----------------------- | ---------------|
| GET    | `/chicken`        | View all chickens informations| ❎ |
| GET    | `/chicken/:id`        | View one chicken informations| ❎ |
| POST    | `/chicken`        | Add a chicken | "name" and "weight"|
| PATCH    | `/chicken/:id`        | Modify some informations of a chicken | "name" and/or "weight" and/or "birthday" and/or "steps" and/or "isrunning" |
| PUT    | `/chicken/:id`        | Modify every informations of a chicken | "name" and "weight" and "birthday" and "steps" and "isrunning" |
| DELETE    | `/chicken/:id`        | Remove a chicken from the database | ❎ |
| PATCH    | `/chicken/run`        | Add a step to a chicken | "id"|

## Intallation and setup

### Clone the project

```bash
git clone git@github.com:Maskalito/ChickenAPI.git
```

### Setup database

1. Install PostgreSQL on your machine

2. Create database, table and fill it

Go on your terminal and run this command :

```bash
psql -U postgres -f api/setup_database.sql
```
You will see theses messages :

```bash
CREATE DATABASE
You are now connected to database "chickendb" as user "postgres".
CREATE TABLE
INSERT 0 1
```

## Run the project

1. Open two terminals

2. Run the api

Move to server directory
```bash
cd api
```

Run the api
```bash
node src/index.js
```

3. Run the app

Move to app directory
```bash
cd app
```

Run the app
```bash
npm start
```

3. Enjoy !

### APPLICATION
- On the home page you can see your chickens. If you do not have yet, you can click on "Create a chicken".
- I you choose a chicken, you can see its informations, walk with it and (if you are a very bad guy or just hungry) kill it.
- You can create the chicken that you want! Name, birthday, weight, its number of steps and if it run or wait.

## Technologies Used

- React: A JavaScript library for building user interfaces.
- TypeScript: A typed superset of JavaScript that helps improve code quality and maintainability.
- Axios: A popular library for making HTTP requests.
- Express : Used for build the API.
- PostgreSQL : A powerful, open source object-relational database system.
- CSS: Styling the user interface.
- HTML : Markup language designed to represent web pages.
