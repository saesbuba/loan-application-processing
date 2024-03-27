import { IsAlphanumeric, IsNotEmpty, IsString } from 'class-validator';

export class LogIn {
  @IsAlphanumeric()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
