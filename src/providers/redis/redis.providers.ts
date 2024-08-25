import { CacheStore } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';

export const redisProvider = {
    useFactory: async (configService: ConfigService) => ({
        store: (await redisStore({
            url: configService.get('REDIS.URL'),
        })) as unknown as CacheStore,
    }),
    inject: [ConfigService],
};
