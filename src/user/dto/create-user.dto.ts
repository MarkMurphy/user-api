import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsUniqueEmail, IsValidPassword } from '../user.validator';

export class CreateUserParams {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @IsUniqueEmail()
  email: string;

  @IsValidPassword()
  password: string;
}
