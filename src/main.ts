import {NestFactory, Reflector} from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {config} from './util/helper';
import {join} from 'path';
import {NestExpressApplication} from '@nestjs/platform-express';
import {ClassSerializerInterceptor} from '@nestjs/common';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '../public'));

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const options = new DocumentBuilder()
    .setTitle(config('app.app_name'))
    .setDescription('The cats API description')
    // .setBasePath('api')
    .setVersion('1.0')
    .addTag('cats')
    .addBearerAuth('Authorization', 'header')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(config('app.app_port'));

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  // @ts-ignore
  global.app = app;
}
bootstrap();
