import { registerDecorator, ValidationOptions, ValidationArguments, IsString, Length } from 'class-validator';
import * as countries from 'i18n-iso-countries';

// Register countries data (English)
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

export function IsCountryCode(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isCountryCode',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') return false;
          const upper = value.toUpperCase();        // Convert to uppercase
          return countries.isValid(upper);          // Check if valid country code
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid ISO 3166-1 alpha-2 country code`;
        }
      },
    });
  };
}