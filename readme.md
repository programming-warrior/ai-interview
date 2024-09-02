
## Run Locally


Locally run Run postgres db

Add your gcp api credentials json file

Set the path in .env file

transpile the code
```bash
    npx tsc -b
```

Generate Migraiton File
```bash
     npx typeorm migration:generate src/migration/schema -d ./dist/db.js
```
 
 Run Migration
```bash
     npx typeorm migration:run -d ./dist/db.js
```

seed the db
```bash
     node ./dist/seed.js
```

start the server
```bash
     node ./dist
```

