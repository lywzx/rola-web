
module.exports = {
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "logging": true,
  "debug": true,
  "password": "",
  "database": "rola-web",
  "entities": [
    "src/**/*.entity{.js,.ts}",
    "src/entity/*.entity{.js,.ts}"
  ],
  "synchronize": true,
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
