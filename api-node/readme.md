# Dunedin API

## api commands
commands to be executed inside __dunedin-api__ container:
`docker exec -it dunedin_mongodb /bin/sh`

## create base user:
`node importer/base-user`
user created:
```
{
	email: "dunedin@paulovelho.com",
	password: "123",
	active: true
}
```

## import gags from twitter
edit file `importer/twitter.js` to set the filename to be imported
run `node importer/twitter`


## import gags from kindle
edit file `importer/kindle.js` to set the filename to be imported
run `node importer/kindle`




### mongo connect:
```
show databases
use dunedin
show tables
db.Gags.drop()
```

#### dump:
go to `/application`
execute: `mongodump --db dunedin --gzip --archive=dunedin.tgz` to backup
execute: `mongorestore --gzip --archive=dunedin.tgz` to restore


