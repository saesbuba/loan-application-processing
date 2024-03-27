import { Injectable, HttpStatus, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, username, email, password, roles } = createUserDto;

    const existingUser = await this.userRepository.findOneBy({ username });

    if (existingUser)
      throw new ConflictException({
        success: false,
        statusCode: HttpStatus.CONFLICT,
        message: `Username ${username} already exist in the database, please select a different username`,
        data: {},
      });

    const passwordHashed = await bcrypt.hash(password, 10);

    const user = new User();
    user.name = name;
    user.username = username;
    user.email = email;
    user.password = passwordHashed;
    user.roles = roles;

    return await this.userRepository.save(user);
  }

  async findOne(username: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ username });
  }
}
