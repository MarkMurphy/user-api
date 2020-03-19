import { IsOptional, IsNotEmpty, IsBoolean } from 'class-validator';
import { IsValidPassword } from '../user.validator';

export class UpdateUserParams {
  @IsOptional()
  @IsNotEmpty()
  firstName?: string;

  @IsOptional()
  @IsNotEmpty()
  lastName?: string;

  @IsOptional()
  @IsValidPassword()
  password?: string;

  @IsOptional()
  @IsBoolean()
  admin?: boolean;

  constructor(partial?: Partial<UpdateUserParams>) {
    Object.assign(this, partial);
  }
}
