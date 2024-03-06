import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { LoanApplicationService } from './loan-application.service';
import { LoanApplicationController } from './loan-application.controller';
import { LoanApplication } from './entities/loan-application.entity';
import { ApplicantModule } from '../applicant/applicant.module';
import { ResponsibleModule } from '../responsible/responsible.module';
import { UtilsService } from './utils.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/guards/auth.guard';

@Module({
  imports: [
    JwtModule,
    ApplicantModule,
    ResponsibleModule,
    TypeOrmModule.forFeature([LoanApplication]),
  ],
  controllers: [LoanApplicationController],
  providers: [
    LoanApplicationService,
    UtilsService,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class LoanApplicationModule {}
