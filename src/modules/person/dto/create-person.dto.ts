import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

const birthDateRegEx = /^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/;

export class CreatePersonDto {
  @IsOptional()
  id?: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  @Matches(birthDateRegEx, {
    message: 'application date does not match the format DD-MM-YYYY',
  })
  birthDate?: string;

  @IsOptional()
  @IsString()
  profession?: string;
}
