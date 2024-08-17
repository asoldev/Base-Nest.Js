import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from '../authentication/authentication.module';
import { AuthGuard } from '../authentication/guards/auth.guard';
import { RBAcGuard } from '../authentication/guards/RBAc.guard';
import { CacheManagerModule } from '../cache-manager/cache-manager.module';
import { environment } from '../config/environment/environment';
import { AppController } from './app.controller';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [environment] }),
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
    CacheManagerModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RBAcGuard,
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
