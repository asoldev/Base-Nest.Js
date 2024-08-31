import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class CacheManagerService {
    constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

    /**
     * Generates a cache key based on the provided inputs.
     * @param {string} prefix - A prefix to help categorize the cache key.
     * @param {...any[]} args - Any additional arguments to include in the key.
     * @returns {string} The generated cache key.
     */
    generateKey(prefix: string, ...args: any[]): string {
        // Use a prefix and arguments to generate a unique cache key
        return `${prefix}:${args.join(":")}`;
    }

    /**
     * Set a value in the cache.
     * @param key The cache key.
     * @param value The value to cache.
     * @param ttl Time-to-live in seconds.
     */
    async set(key: string, value: any, ttl?: number): Promise<void> {
        await this.cacheManager.set(key, value, ttl);
    }

    /**
     * Get a value from the cache.
     * @param key The cache key.
     * @returns The cached value.
     */
    async get(key: string): Promise<any> {
        return await this.cacheManager.get(key);
    }

    /**
     * Check if a key exists in the cache.
     * @param key The cache key.
     * @returns True if the key exists, otherwise false.
     */
    async has(key: string): Promise<boolean> {
        const value = await this.cacheManager.get(key);
        return value !== undefined && value !== null;
    }

    /**
     * Delete a value from the cache.
     * @param key The cache key.
     */
    async del(key: string): Promise<void> {
        await this.cacheManager.del(key);
    }

    /**
     * Reset the cache (clear all keys).
     */
    async reset(): Promise<void> {
        await this.cacheManager.reset();
    }
}
