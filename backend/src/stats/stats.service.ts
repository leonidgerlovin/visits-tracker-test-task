import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { CountryStatsDto } from './dto/country-stats-dto';

@Injectable()
export class StatsService {
  constructor (private readonly redisService: RedisService) {}

  async updateStats(countryCode: string) {
    const key = `country:${countryCode.toLowerCase()}`;
    await this.redisService.incr(key);
  }

  async retrieveStats(): Promise<CountryStatsDto> {
    const stats: Record<string, number> = {};
    const result: CountryStatsDto = {'stats': stats};
    const keys = await this.redisService.keys('country:*');
    if (!keys.length) return result;
    const values = await this.redisService.mGet(keys);

    keys.forEach((key, index) => {
      const countryCode = key.split(':')[1];
      const value = values[index] ? parseInt(values[index], 10) : 0;
      result['stats'][countryCode] = value;
    });

    return result;
  }
}