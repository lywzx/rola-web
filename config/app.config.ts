import {env} from '../src/util/config';

export default {
  app_name: env('APP_NAME', 'rola-web'),
  app_env: env('APP_ENV', 'local'),
  app_debug: env('APP_DEBUG', false),
  app_url: env('APP_URL', 'http://localhost'),
  app_key: env('APP_KEY', ''),
  app_port: env('APP_PORT', 3000),
};
