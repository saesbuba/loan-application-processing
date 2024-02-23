import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  Matches,
  IsPositive,
  IsEmpty,
} from 'class-validator';

import { CreatePersonDto } from '../../person/dto/create-person.dto';

const dateRegEx = /^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/;

export class CreateLoanApplicationDto {
  @IsNotEmpty()
  @IsEnum(['personal', 'business'], {
    message:
      "loanType must be one of the following values: ['personal', 'business'] ",
  })
  loanType: string;

  @IsNotEmpty()
  @IsString()
  @Matches(dateRegEx, {
    message: 'application date does not match the format DD-MM-YYYY',
  })
  applicationDate: string;

  @IsPositive()
  @IsNotEmpty()
  @IsInt()
  loanAmount: number;

  @IsEmpty()
  @IsOptional()
  @IsString()
  remarks?: string;

  @IsNotEmptyObject()
  @IsObject()
  applicant: CreatePersonDto;

  @IsNotEmptyObject()
  @IsObject()
  responsible: CreatePersonDto;
}
