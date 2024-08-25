import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';
import { AppModule } from './app/app.module';
import { configSwagger } from './config/swagger.config';
import { middleware } from './middlewares/app.middleware';

async function bootstrap() {
    const app: INestApplication =
        await NestFactory.create<INestApplication>(AppModule);
    app.enableCors();

    const PORT: number = parseInt(process.env.PORT);

    app.use(morgan('dev'));

    app.setGlobalPrefix('api/v1');

    middleware(app);

    SwaggerModule.setup('api-docs', app, configSwagger(app), {
        swaggerOptions: {
            persistAuthorization: true,
            defaultModelsExpandDepth: -1,
        },
    });

    await app.listen(PORT);

    if (isNaN(parseInt(process.env.PORT))) {
        console.error('No port provided. 👏');
        process.exit(666);
    }
}
bootstrap().then(() => console.log('Service listening 👍: ', process.env.PORT));
