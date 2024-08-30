import { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule } from "@nestjs/swagger";
import helmet from "helmet";
import * as morgan from "morgan";
import { AppModule } from "src/app/app.module";
import { configSwagger } from "src/config/swagger/swagger.config";
import { HttpErrorExceptionFilter } from "src/shared/exception-filters/http-exception.filter";
import { MongoErrorExceptionFilter } from "src/shared/exception-filters/mongodb-exception.filter";

async function bootstrap() {
    const app: INestApplication =
        await NestFactory.create<INestApplication>(AppModule);
    app.enableCors();

    const isProduction = process.env.NODE_ENV === "production" ? true : false;
    const PORT: number = parseInt(process.env.PORT);

    app.use(morgan("dev"));

    app.setGlobalPrefix("api/v1");

    app.useGlobalFilters(
        new MongoErrorExceptionFilter(),
        new HttpErrorExceptionFilter()
    );

    app.use(
        helmet({
            contentSecurityPolicy: isProduction ? undefined : false,
            crossOriginEmbedderPolicy: isProduction ? undefined : false,
        })
    );
    app.enableCors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
        credentials: true,
    });

    SwaggerModule.setup("api-docs", app, configSwagger(app), {
        swaggerOptions: {
            persistAuthorization: true,
            defaultModelsExpandDepth: -1,
        },
    });

    await app.listen(PORT);

    if (isNaN(parseInt(process.env.PORT))) {
        console.error("No port provided. 👏");
        process.exit(666);
    }
}
bootstrap().then(() => console.log("Service listening 👍: ", process.env.PORT));
