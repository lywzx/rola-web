
module.exports = {
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "logging": true,
  "debug": true,
  "password": "root",
  "database": "rola-web",
  "entities": [
    "src/**/*.entity{.js,.ts}",
    "src/entity/*.entity{.js,.ts}"
  ],
  "synchronize": false,
  "entityPrefix": "ly_",
  "seeds": [
    "database/**/*.seed.ts"
  ],
  "factories": [
    "database/**/*.factory.ts"
  ],
  "cli": {
    "entitiesDir": "src/entity",
    "subscribersDir": "src/subscriber",
    "migrationsDir": "database/migration"
  }
}
