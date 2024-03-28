import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePersonDto } from '../person/dto/create-person.dto';
import { Applicant } from './entities/applicant.entity';
import { PersonService } from '../person/person.service';

@Injectable()
export class ApplicantService {
  constructor(
    @InjectRepository(Applicant)
    private readonly applicantRepository: Repository<Applicant>,
    private personService: PersonService,
  ) {}

  async create(createApplicantDto: CreatePersonDto) {
    const newPerson = await this.personService.create(createApplicantDto);

    const newApplicant = new Applicant();
    newApplicant.person = newPerson;

    return await this.applicantRepository.save(newApplicant);
  }

  async findOne(id: number) {
    return await this.applicantRepository.findOneBy({ id });
  }
}
