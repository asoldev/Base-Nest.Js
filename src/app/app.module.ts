import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { environment } from '../config/environment/environment';
import { AppController } from './app.controller';
import { AuthGuard } from '../authentication/guards/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [environment] })
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true, // transform object to DTO class
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
}
