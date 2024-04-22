import { INestApplication } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import * as morgan from 'morgan';
import { AppModule } from './app/app.module';
import { middleware } from './middlewares/app.middleware';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create<INestApplication>(AppModule);
  app.enableCors();

  const PORT: number = parseInt(process.env.PORT) ?? 3000

  app.use(morgan('dev'));

  app.setGlobalPrefix('api/v1')

  middleware(app)
  await app.listen(PORT);

  if (isNaN(parseInt(process.env.PORT))) {
    console.error('No port provided. 👏');
    process.exit(666);
  }

}
bootstrap().then(() => console.log('Service listening 👍: ', process.env.PORT));
