import { ApiProperty } from '@nestjs/swagger';

export class CountryStatsDto {
  @ApiProperty({
    description: 'Retrieving stats from Redis storage',
    example: { us: 12, it: 5, fr: 8 },
    type: Object,
  })
  readonly stats: Record<string, number>;
}