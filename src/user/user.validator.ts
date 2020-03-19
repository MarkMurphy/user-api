import { applyDecorators } from '@nestjs/common';
import { getRepository } from 'typeorm';
import {
  registerDecorator,
  IsNotEmpty,
  MinLength,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { User } from './user.entity';

export const PASSWORD_MIN_LENGTH = 8;

export function IsValidPassword() {
  return applyDecorators(IsNotEmpty(), MinLength(PASSWORD_MIN_LENGTH));
}

@ValidatorConstraint({ name: 'isUniqueEmail', async: true })
export class IsUniqueEmailConstraint implements ValidatorConstraintInterface {
  async validate(email: string): Promise<boolean> {
    const user = await getRepository(User).findOne({
      where: {
        email,
      },
    });

    return user ? false : true;
  }
  defaultMessage(): string {
    return 'An account with this email already exists.';
  }
}

export function IsUniqueEmail(validationOptions?: ValidationOptions) {
  return function(object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isUniqueEmail',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUniqueEmailConstraint,
    });
  };
}

const isBlank = value => [undefined, null, ''].some(x => x === value);

export function IsMutuallyExclusive(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function(object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isMutuallyExclusive',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return isBlank(value) || isBlank(relatedValue);
        },
      },
    });
  };
}
