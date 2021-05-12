# Using Cassandra as a Database

## Start Cassandra

To start the service type `cassandra -f` in the terminal.

In another terminal, you may now use `cqlsh`.

If `cassandra -f` give you an error, the Java version may not be OpenJDK. To check and assign:

```bash
/usr/libexec/java_home -V
```

Then:

```bash
export JAVA_HOME=`/usr/libexec/java_home -v 1.8.0_***`
```

Replace the stars with the OpenJDK version seen in your terminal.

## Create the Database

A `KEYSPACE` is equivalent to a MongoDB or MySQL database name. The below is the default creation within `cqlsh` for this repo.

```bash
CREATE KEYSPACE IF NOT EXISTS coursera
WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 3};
USE coursera;
```

## Initialize the Schema

This repo stores the user defined types and tables inside a `.cql` file.

### Initialize the file from a local terminal

```bash
cqlsh -u 'my_username' -p 'my_password' -f /mydir/myfile.cql
```

or

```bash
cqlsh -f /files/tables.cql
```

If logged in to cqlsh already, enter:

```bash
SOURCE '/mydir/myfile.cql'
```

### Initializing the file to a Docker container

```bash
docker exec -it cas cqlsh -f /files/tables.cql
```
