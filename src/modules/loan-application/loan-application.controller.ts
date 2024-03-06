import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';

import { LoanApplicationService } from './loan-application.service';
import { CreateLoanApplicationDto } from './dto/create-loan-application.dto';
import { HasRoles } from '../auth/roles.decorator';
import { Roles as Role } from '../auth/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('applications')
export class LoanApplicationController {
  constructor(
    private readonly loanApplicationService: LoanApplicationService,
  ) {}

  @Post()
  async create(@Body() createLoanApplicationDto: CreateLoanApplicationDto) {
    return await this.loanApplicationService.create(createLoanApplicationDto);
  }

  @HasRoles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get()
  async findAll() {
    return await this.loanApplicationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.loanApplicationService.findOne(Number(id));
  }
}
