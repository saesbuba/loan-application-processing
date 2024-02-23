import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { LoanApplication } from '../../loan-application/entities/loan-application.entity';
import { Person } from 'src/modules/person/entities/person.entity';

@Entity()
export class Applicant {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @OneToMany(
    () => LoanApplication,
    (LoanApplication) => LoanApplication.applicant,
  )
  loan_applications: Array<LoanApplication>;

  @OneToOne(() => Person)
  @JoinColumn()
  person: Person;
}
