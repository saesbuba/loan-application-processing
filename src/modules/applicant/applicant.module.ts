import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApplicantService } from './applicant.service';
import { Applicant } from './entities/applicant.entity';
import { PersonModule } from '../person/person.module';

@Module({
  imports: [PersonModule, TypeOrmModule.forFeature([Applicant])],
  controllers: [],
  providers: [ApplicantService],
  exports: [ApplicantService],
})
export class ApplicantModule {}
