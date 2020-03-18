import { applyDecorators } from '@nestjs/common';
import { getRepository } from 'typeorm';
import {
  registerDecorator,
  IsNotEmpty,
  MinLength,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
} from 'class-validator';
import { User } from './user.entity';

export const PASSWORD_MIN_LENGTH = 6;

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
