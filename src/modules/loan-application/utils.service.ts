import { Injectable } from '@nestjs/common';

import { LoanApplication } from './entities/loan-application.entity';

@Injectable()
export class UtilsService {
  constructor() {}

  async formatLoanApplications(loanApplications: Array<LoanApplication>) {
    const loanApplicationsFormatted = [];

    for await (const loanApplication of loanApplications) {
      loanApplicationsFormatted.push({
        ...loanApplication,
        applicant: {
          ...loanApplication.applicant.person,
          id: loanApplication.applicant.id,
        },
        responsible: {
          ...loanApplication.responsible.person,
          id: loanApplication.responsible.id,
        },
      });
    }

    return loanApplicationsFormatted;
  }
}
