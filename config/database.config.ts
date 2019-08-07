import {config, env} from '../src/util/config';
import {TypeOrmModuleOptions} from '@nestjs/typeorm';

export default {
  /*
     |--------------------------------------------------------------------------
     | Default Database Connection Name
     |--------------------------------------------------------------------------
     |
     | Here you may specify which of the database connections below you wish
     | to use as your default connection for all database work. Of course
     | you may use many connections at once using the Database library.
     |
     */

  default: env('DB_CONNECTION', 'mysql'),

  /*
  |--------------------------------------------------------------------------
  | Database Connections
  |--------------------------------------------------------------------------
  |
  | Here are each of the database connections setup for your application.
  | Of course, examples of configuring each database platform that is
  | supported by Laravel is shown below to make development simple.
  |
  |
  | All database work in Laravel is done through the PHP PDO facilities
  | so make sure you have the driver for your particular database of
  | choice installed on your machine before you begin development.
  |
  */

  connections: {

    sqlite:
      {
        driver: 'sqlite',
        database: env('DB_DATABASE', __dirname + '/database.sqlite'),
        prefix: '',
      },

    mysql: {
      type: 'mysql',
      host: env('DB_HOST', '127.0.0.1'),
      port: env('DB_PORT', '3306'),
      username: env('DB_USERNAME', 'forge'),
      password: env('DB_PASSWORD', ''),
      database: env('DB_DATABASE', 'forge'),
      entityPrefix: env('DB_PREFIX', ''),
      synchronize: env('DB_SYNCHRONIZE', false),
      // not work when create table
      charset: 'utf8mb4',
      collation: 'utf8mb4_unicode_ci',
      retryAttempts: 3,
      retryDelay: 20000,
      keepConnectionAlive: true,
      multipleStatements: false,
      engine: 'InnoDB',
      timezone: 'local',
      debug: env('DB_DEBUG', config('app.app_debug')),
      trace: env('DB_LOGGING', config('app.app_debug')),
      supportBigNumbers: false,
      migrationsRun: false,
      entities: [
        'src/**/*.entity{.js,.ts}',
      ],
      seeds: [
        'database/**/*.seed.ts',
      ],
      factories: [
        'database/**/*.factory.ts',
      ],
      cli: {
        entitiesDir: 'src/entity',
        subscribersDir: 'src/subscriber',
        migrationsDir: 'database/migrations',
      },
      migrationsTableName: env('DB_PREFIX', '') + 'migrations',
      migrations: ['database/migrations/*.ts'],
    } as TypeOrmModuleOptions,
  },

  redis: {
    client: 'predis',
    default: {
      host: env('REDIS_HOST', '127.0.0.1'),
      password: env('REDIS_PASSWORD', null),
      port: env('REDIS_PORT', 6379),
      database: 0,
    },
  },
};
