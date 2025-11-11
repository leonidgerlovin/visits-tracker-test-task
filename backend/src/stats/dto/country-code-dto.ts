import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, Matches } from 'class-validator';
import { IsCountryCode } from './validators/country-code-validator';

export class CountryCodeDto {
  @ApiProperty({default: 'us'})
  @IsCountryCode({ message: 'Country code must be valid (e.g., us, it, fr)' })
  // @IsString()
  // @Length(2, 2, { message: 'Country code must be exactly 2 characters long' })
  // @Matches(/^[A-Za-z]{2}$/, { message: 'Country code must contain only letters' })
  countryCode: string;
}