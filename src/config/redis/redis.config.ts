import { CacheStore } from "@nestjs/cache-manager";
import { ConfigService } from "@nestjs/config";
import { redisStore } from "cache-manager-redis-store";

export const redisConfig = {
    useFactory: async (configService: ConfigService) => ({
        store: (await redisStore({
            url: configService.get<string>("REDIS.URL"),
        })) as unknown as CacheStore,
    }),
    inject: [ConfigService],
};
