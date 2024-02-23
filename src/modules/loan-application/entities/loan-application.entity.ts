import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Applicant } from '../../applicant/entities/applicant.entity';
import { Responsible } from '../../responsible/entities/responsible.entity';

@Entity('loan_application')
export class LoanApplication {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column()
  loanType: string;

  @Column()
  applicationDate: Date;

  @Column()
  loanAmount: number;

  @Column()
  remarks: string;

  @ManyToOne(() => Applicant, (applicant) => applicant.loan_applications)
  applicant: Applicant;

  @ManyToOne(() => Responsible, (responsible) => responsible.loan_applications)
  responsible: Responsible;
}
