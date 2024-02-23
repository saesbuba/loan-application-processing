export interface LoanApplicationModel {
  id: number;
  loanType: string;
  applicationDate: string;
  loanAmount: number;
  remarks: string;
  applicant: Applicant;
  responsible: Responsible;
}

interface Applicant {
  id: number;
  name: string;
  lastName: string;
  birthDate: string;
}

interface Responsible {
  id: number;
  name: string;
  lastName: string;
  birthDate: string;
}
