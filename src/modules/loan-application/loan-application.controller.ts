import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';

import { LoanApplicationService } from './loan-application.service';
import { CreateLoanApplicationDto } from './dto/create-loan-application.dto';
import { HasRoles } from '../authorization/roles.decorator';
import { Roles as Role } from '../authorization/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('applications')
export class LoanApplicationController {
  constructor(
    private readonly loanApplicationService: LoanApplicationService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createLoanApplicationDto: CreateLoanApplicationDto) {
    return await this.loanApplicationService.create(createLoanApplicationDto);
  }

  @HasRoles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  async findAll() {
    return await this.loanApplicationService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.loanApplicationService.findOne(Number(id));
  }
}
