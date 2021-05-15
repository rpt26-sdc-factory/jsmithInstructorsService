# How to Seed JSON Data in Bulk

## Seeding via JSON file

In order to seed a JSON file and bulk insert data, [dsbulk](https://docs.datastax.com/en/dsbulk/doc/dsbulk/install/dsbulkInstall.html) must be installed.

Each table is seeded via a bash script that runs dsbulk.

`dsbulk load -k keyspace -t table --connector.json.mode=SINGLE_DOCUMENT -c json -url 'filename.json'`

Each line of the bash commands imports 1 JSON file.

## Seeding via CSV file

Simply run the following in a bashscript or directly within `cqlsh`.

```bash
COPY keyspace_name.table_name (fields) FROM 'folder/file.csv' WITH DELIMITER=',' AND HEADER=TRUE;
```

Your delmiter may be another symbol, such as "|".
