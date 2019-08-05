import {INestApplication} from '@nestjs/common';

/*declare module NodeJS {
  interface Global {
    app: INestApplication;
  }
}*/
declare global {
  const app: INestApplication;

  namespace NodeJS {
    const app: INestApplication;

    interface Global {
      app: INestApplication;
    }
  }
}
