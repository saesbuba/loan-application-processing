import { Injectable } from '@nestjs/common';

import { LoanApplication } from './entities/loan-application.entity';

@Injectable()
export class UtilsService {
  constructor() {}

  formatLoanApplications(loanApplications: Array<LoanApplication>) {
    return loanApplications.map((loanApplication) =>
      this.formatLoanApplication(loanApplication),
    );
  }

  formatLoanApplication(loanApplication: LoanApplication) {
    return {
      ...loanApplication,
      applicant: {
        ...loanApplication.applicant.person,
        id: loanApplication.applicant.id,
      },
      responsible: {
        ...loanApplication.responsible.person,
        id: loanApplication.responsible.id,
      },
    };
  }
}
