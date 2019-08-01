import {INestApplication} from '@nestjs/common';

/*declare module NodeJS {
  interface Global {
    app: INestApplication;
  }
}*/
declare global {
  var app: INestApplication;

  namespace NodeJS {
    var app: INestApplication;

    interface Global {
      app: INestApplication
    }
  }
}


