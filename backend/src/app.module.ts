import { Module } from '@nestjs/common';
import { RedisModule } from './redis/redis.module';
import { StatsModule } from './stats/stats.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RedisModule, 
    StatsModule],
})
export class AppModule {}
