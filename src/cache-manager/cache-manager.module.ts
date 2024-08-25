import { CacheModule } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';
import { redisProvider } from 'src/providers/redis/redis.providers';
import { CacheManagerService } from './cache-manager.service';

@Global()
@Module({
    imports: [CacheModule.registerAsync(redisProvider)],
    providers: [CacheManagerService],
    exports: [CacheManagerService],
})
export class CacheManagerModule {}
