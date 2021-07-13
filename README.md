# Coursera Clone

A clone of Coursera's course page. This repo is a module of the "Instructors" section, functioning as a service. The front-end was forked from [Ingenuity-rpt26/jsmithInstructorsService](https://github.com/Ingenuity-rpt26/jsmithInstructorsService). This repo is responsible for system design of the service, including a revamp of the placeholder noSQL database to PostgreSQL, server side rendering, and scaling (via caching and load balancing).

![Network Architecture](https://vbao-readme-screenshots.s3.us-west-1.amazonaws.com/sdc_network_architecture.png)

## Related Projects

- [About Service](https://github.com/rpt26-sdc-factory/james-about-service)
- [Proxy](https://github.com/rpt26-sdc-factory/vbao-proxy)
- [Syllabi Service](https://github.com/rpt26-sdc-factory/kim-syllabi-service)
- [Title Banner Service](https://github.com/rpt26-sdc-factory/anthony-titleBanner-service)

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [API](#API)
1. [Database](#database)
1. [Development](#development)

## Usage

This repo provides back-end system design for the Instructors module of Coursera's item detail page. This service also makes requests to the Images service in order to render Instructor profile images.

## Requirements

- Node
- PostgreSQL
- NGINX (load balancing)
- Redis (caching)
- Webpack/Webpack-CLI

## API

### Create

Endpoint | Description | Expected input
--- | --- | ---
'POST /api/instructors' | Adds a new instructor into the database. | <code>{<br>&ensp;_id: Number,<br>&ensp;firstName: String,<br>&ensp;middleInitial: String,<br>&ensp;lastName: String,<br>&ensp;academicTitle: String,<br>&ensp;title: String,<br>&ensp;organization: String,<br>&ensp;learners: Number,<br>&ensp;courses: [{<br>&ensp;&ensp;courseNumber: Number,<br>&ensp;&ensp;isPrimaryInstructor: Boolean<br>&ensp;}],<br>&ensp;instructorAverageRating: String,<br>&ensp;numberOfRatings: Number<br>}</code>

### Read

Endpoint | Description | Response
--- | --- | ---
'/api/instructors/:courseNumber' | Retreives all instructors of the identified course ID | <code>{<br>&ensp;_id: Number,<br>&ensp;firstName: String,<br>&ensp;middleInitial: String,<br>&ensp;lastName: String,<br>&ensp;academicTitle: String,<br>&ensp;title: String,<br>&ensp;organization: String,<br>&ensp;learners: Number,<br>&ensp;courses: [{<br>&ensp;&ensp;courseNumber: Number,<br>&ensp;&ensp;isPrimaryInstructor: Boolean<br>&ensp;}],<br>&ensp;instructorAverageRating: String,<br>&ensp;numberOfRatings: Number<br>}</code>
'/api/primaryinstructor/:courseNumber' | Retreives only the primary instructor of the identified course ID | <code>{<br>&ensp;_id: Number,<br>&ensp;firstName: String,<br>&ensp;...<br>&ensp;numberOfRatings: Number<br>}</code>

### Update

Endpoint | Description | Expected input
--- | --- | ---
'PUT /api/instructors/:instructorid' | Updates an instructors details based on instructor ID | <code>{<br>&ensp;firstName: String,<br>&ensp;middleInitial: String,<br>&ensp;lastName: String,<br>&ensp;academicTitle: String,<br>&ensp;title: String,<br>&ensp;organization: String,<br>&ensp;learners: Number,<br>&ensp;instructorAverageRating: String,<br>&ensp;numberOfRatings: Number<br>}</code>

### Delete

Endpoint | Description
--- | ---
'DELETE /api/instructors/:instructorid' | Deletes an instructor based on instructor ID. Deletes from related courses and primary courses as well.

## Database

The schema sets up 3 tables. An `instructor_details` table that contains isntructor information, a `primary_instructors` table that contains a list of courses and their primary instructors, and lastly a `assistant_instructors` table that contains courses and their assistant instructors and their assistant instructor ID. `instructor_details` is referenced in the other 2 tables.

![Database schema](https://vbao-readme-screenshots.s3.us-west-1.amazonaws.com/sdc_postgresql_schema.png)

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

### Seed Database

From within the root directory:

```sh
npm run seed
```

This script will run a seeding script to insert 10 million primary rows into a PostgreSQL database called `coursera` to the `instructor_details` table. This will also insert 10 million into the `primary_instructors` table, and ~10-50 million into the `assistant_instructors` table.

Prior to running the seeding script locally, be sure the PostgreSQL server is started.

### Transpile React

From within the root directory in its own terminal:

```sh
npm run build
```

This script will transpile updates made to files within the `./client` folder to the `./public` folder. This script will continually watch for changes.

### Run Tests

Test scripts will test the database, API, client, and seeding script via Jest and will show coverage of the tests in the terminal.

Prior to running the test be sure the local Postgres server is started. And that the API server is started as well.

From within the root directory:

```sh
npm start
```

In a separate terminal window, from within the root directory:

```sh
npm run test
```

### Sample .env file

The `.env` file should be in the root folder with your `package.json`. The environment variables were created for flexibility. Variables prefixed with `PG` are used for connection to Postgres. `PRIMARY_RECORD_BATCH_` variables reflect batch sizes and numbers for asynchronous bulk insertion.

```env
SERVER_PORT=localhost
SERVER_HOST=localhost
IMAGES_HOST=<link to Images service>

PGUSER=postgres
PGPASSWORD=postgres
PGHOST=localhost
PGDATABASE=postgres
PGPORT=5432

PRIMARY_RECORD_BATCH_SIZE=10000
PRIMARY_RECORD_BATCH_NUM=1000
```
