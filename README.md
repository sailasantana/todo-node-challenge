Live coding practice interview question
=======================================

## Overview

This is a FullStack Todo Application, the client is based on [Todo MVC](http://todomvc.com/)

- Stack:
  - Client: Basic jQuery selectors, event-handlers, DOM manipulation and AJAX
  - Web Server: Node and Express with PostgreSQL 
  - Database: Locally hosted PostgreSQL 
  - Tests: Supertest, Chai

## The Rules

As in previous interviews, you may consult official docs and reference-style resources during this coding challenge. You are encouraged to work through as much of it on your own as you can.


## Setup
- Clone this repository to your local machine
- Install the dependencies for the project
- Ensure your PostgreSQL server is running
- Create a User for this exercise
- Create a database for the exercise with your user as the owner
- Rename the `example.env` file to `.env` and update the following fields with your database credentials:
  ```
   MIGRATION_DB_NAME=
   MIGRATION_DB_USER=
   MIGRATION_DB_PASS=
   DB_URL="postgresql://USERNAME@localhost/DATABASE_NAME"
  ```
- Run the command `npm run migrate -- 1` to create the database tables
- run the command `npm t`
- You should see output from 10 integration tests, some will be failing.

## Exercise

1. Add the GET (all) endpoint to this application.
2. Add the POST endpoint to this application.


You have completed the task when all the unit tests pass and the client application works without any errors.
