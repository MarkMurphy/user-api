import { IsOptional, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsMutuallyExclusive } from '../user.validator';

export class ListUsersParams {
  @IsOptional()
  @IsNumber()
  @Transform(value => Number(value))
  first?: number;

  @IsOptional()
  @IsNumber()
  @IsMutuallyExclusive('first', {
    message:
      'Passing both `first` and `last` is not supported. ' +
      'These parameters are mutually exclusive.',
  })
  @Transform(value => Number(value))
  last?: number;

  @IsOptional()
  @IsNumber()
  @Transform(value => Number(value))
  before?: string;

  @IsOptional()
  @IsNumber()
  @Transform(value => Number(value))
  after?: string;
}
