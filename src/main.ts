import "reflect-metadata";

import { INestApplication } from "@nestjs/common/interfaces/nest-application.interface";
import { ValidationPipe } from "@nestjs/common/pipes/validation.pipe";
import { NestFactory } from "@nestjs/core/nest-factory";
import helmet from "helmet";
import * as morgan from "morgan";
import { AppModule } from "src/app/app.module";
import { HttpErrorExceptionFilter } from "src/shared/exception-filters/http-exception.filter";
import { MongoErrorExceptionFilter } from "src/shared/exception-filters/mongodb-exception.filter";
import { accessLogStream, errorLogStream } from "./config/morgan/morgan.config";
import { LoggingInterceptor } from "./shared/interceptors/logging.interceptor";
import { TimeoutInterceptor } from "./shared/interceptors/timeout.interceptor";
import { TransformInterceptor } from "./shared/interceptors/transform.interceptor";

async function bootstrap() {
  const app: INestApplication =
    await NestFactory.create<INestApplication>(AppModule);
  app.enableCors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    credentials: true,
  });

  const isProduction = process.env.NODE_ENV === "production" ? true : false;
  const PORT: number = parseInt(process.env.PORT);

  app.setGlobalPrefix("api");
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(
    new MongoErrorExceptionFilter(),
    new HttpErrorExceptionFilter()
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    })
  );

  if (isProduction) {
    app.use(
      helmet({
        contentSecurityPolicy: true,
        crossOriginEmbedderPolicy: true,
      })
    );

    app.use(morgan("combined", { stream: accessLogStream }));
    app.use(
      morgan("combined", {
        skip: (req, res) => res.statusCode < 400,
        stream: errorLogStream,
      })
    );
  }

  if (isNaN(PORT)) {
    console.error("No port provided. 👏");
    process.exit(666);
  }

  await app.listen(PORT);
  console.log(`NestJs development server started: ${await app.getUrl()} 👍`);
}
bootstrap();
