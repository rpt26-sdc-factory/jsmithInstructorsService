# How to Seed JSON Data in Bulk

In order to seed a JSON file and bulk insert data, [dsbulk](https://docs.datastax.com/en/dsbulk/doc/dsbulk/install/dsbulkInstall.html) must be installed.

## How to configure the .sh files

Each table is seeded via a bash script that runs dsbulk.

`
dsbulk load -k keyspace -t table --connector.json.mode=SINGLE_DOCUMENT -c json -url 'filename.json'
`

Each line of the bash commands imports 1 JSON file.
