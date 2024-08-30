import { Module, ValidationPipe } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { mongoConfig } from "src/config/databases/mongo.config";
import { environment } from "src/config/environment/environment";
import { CacheManagerModule } from "src/core/frameworks/cache-manager/cache-manager.module";
import { TimeoutInterceptor } from "src/shared/interceptors/timeout.interceptor";
import { TransformInterceptor } from "src/shared/interceptors/transform.interceptor";
import { AppController } from "./app.controller";
import { V1Module } from "src/modules/v1.module";
@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [environment] }),
        MongooseModule.forRootAsync(mongoConfig),
        CacheManagerModule,
        V1Module,
    ],
    controllers: [AppController],
    providers: [
        // {
        //     provide: APP_GUARD,
        //     useClass: AuthGuard,
        // },
        // {
        //     provide: APP_GUARD,
        //     useClass: RBAcGuard,
        // },
        {
            provide: APP_INTERCEPTOR,
            useClass: TimeoutInterceptor,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: TransformInterceptor,
        },
        {
            provide: APP_PIPE,
            useValue: new ValidationPipe({
                transform: true,
                whitelist: true,
            }),
        },
    ],
})
export class AppModule {}
