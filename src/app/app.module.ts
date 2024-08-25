import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { TimeoutInterceptor } from 'src/modules/interceptors/timeout.interceptor';
import { TransformInterceptor } from 'src/modules/interceptors/transform.interceptor';
import { databaseProviders } from 'src/providers/database/database.providers';
import { ApiModule } from '../apis/api.module';
import { AuthenticationModule } from '../authentication/authentication.module';
import { AuthGuard } from '../authentication/guards/auth.guard';
import { RBAcGuard } from '../authentication/guards/RBAc.guard';
import { CacheManagerModule } from '../cache-manager/cache-manager.module';
import { environment } from '../config/environment/environment';
import { AppController } from './app.controller';
import { HttpExceptionFilter } from 'src/modules/exception-filters/http-exception.filter';
@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [environment] }),
        MongooseModule.forRootAsync(databaseProviders),
        CacheManagerModule,
        AuthenticationModule,
        ApiModule,
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
            provide: APP_INTERCEPTOR,
            useClass: TimeoutInterceptor,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: TransformInterceptor,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: HttpExceptionFilter,
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
