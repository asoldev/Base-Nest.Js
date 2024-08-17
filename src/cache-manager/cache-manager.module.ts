import type { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-store';
import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheManagerService } from './cache-manager.service';

@Global()
@Module({
  imports: [CacheModule.register()],
  providers: [CacheManagerService],
  exports: [CacheManagerService],
})
export class CacheManagerModule {}
