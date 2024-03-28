import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePersonDto } from '../person/dto/create-person.dto';
import { Responsible } from './entities/responsible.entity';
import { PersonService } from '../person/person.service';

@Injectable()
export class ResponsibleService {
  constructor(
    @InjectRepository(Responsible)
    private readonly responsibleRepository: Repository<Responsible>,
    private personService: PersonService,
  ) {}

  async create(createResponsibleDto: CreatePersonDto) {
    const newPerson = await this.personService.create(createResponsibleDto);

    const newResponsible = new Responsible();
    newResponsible.person = newPerson;

    return await this.responsibleRepository.save(newResponsible);
  }

  async findOne(id: number) {
    return await this.responsibleRepository.findOneBy({ id });
  }
}
