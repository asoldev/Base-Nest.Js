import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { MiddlewareConsumer } from "@nestjs/common/interfaces/middleware/middleware-consumer.interface";
import { NestModule } from "@nestjs/common/interfaces/modules/nest-module.interface";
import { ConfigModule } from "@nestjs/config/dist/config.module";
import { APP_GUARD } from "@nestjs/core/constants";
import { MongooseModule } from "@nestjs/mongoose";
import { mongoConfig } from "src/config/databases/mongo.config";
import { environment } from "src/config/environment/environment";
import { CacheManagerModule } from "src/core/frameworks/cache-manager/cache-manager.module";
import { V1Module } from "src/modules/v1.module";
import { AuthenticationModule } from "src/modules/v1/auth/authentication.module";
import { RBAcGuard } from "../modules/v1/auth/guards/RBAc.guard";
import { RateLimiterMiddleware } from "../utils/rate-limiter.middleware";
import { AppController } from "./app.controller";
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [environment] }),
    MongooseModule.forRootAsync(mongoConfig),
    AuthenticationModule,
    CacheManagerModule,
    V1Module,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RBAcGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RateLimiterMiddleware).forRoutes("*");
  }
}
