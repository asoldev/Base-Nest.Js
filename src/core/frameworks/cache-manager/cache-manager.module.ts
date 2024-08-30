import { CacheModule } from "@nestjs/cache-manager";
import { Global, Module } from "@nestjs/common";
import { CacheManagerService } from "./cache-manager.service";
import { redisConfig } from "src/config/redis/redis.config";

@Global()
@Module({
    imports: [CacheModule.registerAsync(redisConfig)],
    providers: [CacheManagerService],
    exports: [CacheManagerService],
})
export class CacheManagerModule {}
