# How to configure the .sh files

Each table is seeded via a bash script that runs mongoimport.

`
time mongoimport --db=<database name> --collection=<collection name> --type=json --file <filename> --mode=insert --jsonArray
`

Each line of the bash commands imports 1 json file.
