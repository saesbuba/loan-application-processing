import {
  Injectable,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Response } from '../../common-data-models/response.model';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  genericResponse: Response<User | NonNullable<unknown>>;

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {
    this.genericResponse = {
      success: true,
      statusCode: 200,
      message: '',
      data: {},
    };
  }

  async register(
    createUserDto: CreateUserDto,
  ): Promise<Response<User | NonNullable<unknown>>> {
    try {
      const newUserInfo = await this.userService.create(createUserDto);
      return {
        ...this.genericResponse,
        statusCode: 201,
        data: newUserInfo,
      };
    } catch (error) {
      throw new HttpException(error.response, error.response.statusCode);
    }
  }

  async login(
    username: string,
    password: string,
  ): Promise<Response<User | NonNullable<unknown>>> {
    const user = await this.userService.findOne(username);

    if (!user)
      throw new NotFoundException({
        ...this.genericResponse,
        success: false,
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User not found',
      });

    const isPasswordMatching = await bcrypt.compare(password, user?.password);

    if (!isPasswordMatching)
      throw new UnauthorizedException({
        ...this.genericResponse,
        success: false,
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
      });

    const payload = {
      sub: user.id,
      username: user.username,
      roles: user.roles,
    };

    const jwt = await this.jwtService.signAsync(payload);
    return {
      ...this.genericResponse,
      statusCode: 201,
      data: {
        accessToken: jwt,
        tokenType: 'Bearer',
      },
    };
  }
}
