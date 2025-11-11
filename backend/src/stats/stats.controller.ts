import { Body, Controller, Get, Post } from '@nestjs/common';
import { StatsService } from './stats.service';
import { CountryCodeDto } from './dto/country-code-dto';
import { CountryStatsDto } from './dto/country-stats-dto';
import { ApiParam } from '@nestjs/swagger';

@Controller('stats')
export class StatsController {
  constructor(private readonly appService: StatsService) {}
  
    @Post('update')
    updateStats(@Body() countryCodeDto: CountryCodeDto) {
      return this.appService.updateStats(countryCodeDto.countryCode);
    }
  
    @Get('retrieve')
    retrieveStats(): Promise<CountryStatsDto> {
      return this.appService.retrieveStats();
    }
}
