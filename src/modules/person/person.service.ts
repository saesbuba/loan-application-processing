import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePersonDto } from './dto/create-person.dto';
import { Person } from './entities/person.entity';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async create(createPersonDto: CreatePersonDto) {
    const newPerson = new Person();
    newPerson.birthDate = new Date(createPersonDto.birthDate);
    newPerson.name = createPersonDto.name;
    newPerson.lastName = createPersonDto.lastName;

    return await this.personRepository.save(newPerson);
  }

  async findOne(id: number) {
    this.personRepository.findOneBy({ id });
  }
}
