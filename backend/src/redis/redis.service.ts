import { Injectable, Inject } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  constructor(@Inject('REDIS_CLIENT') private client: RedisClientType) {}

  // Generic wrapper for error handling
  private async handleRedis<T>(operation: () => Promise<T>): Promise<T> {
    try {
      if (!this.client.isOpen) {
        throw new Error('Redis client is not connected');
      }
      return await operation();
    } catch (err: any) {
      if (err.message.includes('ECONNREFUSED')) {
        throw new Error('Cannot connect to Redis server');
      }
      if (err.message.includes('WRONGTYPE')) {
        throw new Error('Redis key has wrong type');
      }
      // fallback
      throw new Error(`Redis operation failed: ${err.message}`);
    }
  }
  
  async incr(key: string) {
    return this.handleRedis(async () => {
      await this.client.incr(key);
    });
  }
  
  async keys(pattern: string): Promise<string[]> {
    return this.handleRedis(async () => {
      const matchedKeys = await this.client.keys(pattern);
      return matchedKeys;
    });
  }
  
  async mGet(keys: string[]): Promise<string[]> {
    return this.handleRedis(async () => {
      console.log(keys)
      if (!keys.length) return [];
      console.log(!keys);
      const values = await this.client.mGet(keys);
      return values.filter((v): v is string => v !== null);
    });
  }
}

  // async set(key: string, value: any) {
  //   await this.client.set(key, JSON.stringify(value));
  // }

  // async get<T = any>(key: string): Promise<T | null> {
  //   const val = await this.client.get(key);
  //   return (typeof val === 'string') ? JSON.parse(val) : null;
  // }

  // async del(key: string) {
  //   await this.client.del(key);
  // }