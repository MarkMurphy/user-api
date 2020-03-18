import { IsNotEmpty } from 'class-validator';

export class LoginParams {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
