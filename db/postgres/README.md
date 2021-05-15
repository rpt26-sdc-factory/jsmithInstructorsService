# Using Postgres as a Database

## Start Postgres

Using Postgres.app for MacOS you can initialize a terminal for a server, or a PATH can be set for a regular terminal to initialize Postgres via `psql`.

## Initialize Schemas

To load the schema into Postgres we load the schema file into the terminal.

```bash
psql -f /path/schema.sql
```

While inside the `psql` terminal, `\dn` will list all schemas in the server.

To change schema, you can type `SET search_path TO schema_name`.

To check the table settings, you can type `\d table_name` to DESCRIBE the table.
