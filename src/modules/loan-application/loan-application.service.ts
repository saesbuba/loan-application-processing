import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateLoanApplicationDto } from './dto/create-loan-application.dto';
import { LoanApplication } from './entities/loan-application.entity';
import { ApplicantService } from '../applicant/applicant.service';
import { ResponsibleService } from '../responsible/responsible.service';

import { LoanApplicationModel } from './data-models/loan-application-response-model';
import { Response } from '../../common-data-models/response.model';

import { UtilsService } from './utils.service';

ResponsibleService;
@Injectable()
export class LoanApplicationService {
  _response;

  constructor(
    @InjectRepository(LoanApplication)
    private readonly loanApplicationRepository: Repository<LoanApplication>,
    private applicantService: ApplicantService,
    private responsibleService: ResponsibleService,
    private utilsService: UtilsService,
  ) {
    this._response = {
      success: true,
      statusCode: 200,
      message: '',
      data: [],
    };
  }

  async create(
    createLoanApplicationDto: CreateLoanApplicationDto,
  ): Promise<Response<LoanApplicationModel | []>> {
    const { applicant, responsible } = createLoanApplicationDto;

    let applicantObject;
    if (applicant.id) {
      applicantObject = await this.applicantService.findOne(applicant.id);
    } else {
      applicantObject = await this.applicantService.create(applicant);
    }

    let responsibleObject;
    if (responsible.id) {
      responsibleObject = await this.responsibleService.findOne(responsible.id);
    } else {
      responsibleObject = await this.responsibleService.create(responsible);
    }

    const newLoanApplication = new LoanApplication();
    newLoanApplication.loanType = createLoanApplicationDto.loanType;
    newLoanApplication.loanAmount = createLoanApplicationDto.loanAmount;
    newLoanApplication.applicationDate = new Date(
      createLoanApplicationDto.applicationDate,
    );
    newLoanApplication.remarks = createLoanApplicationDto.remarks ?? '';
    newLoanApplication.applicant = applicantObject;
    newLoanApplication.responsible = responsibleObject;

    const newLoanApplicationFromDataBase =
      await this.loanApplicationRepository.save(newLoanApplication);

    return {
      ...this._response,
      data: {
        ...newLoanApplicationFromDataBase,
        applicant: {
          ...newLoanApplicationFromDataBase.applicant.person,
          id: newLoanApplicationFromDataBase.applicant.id,
        },
        responsible: {
          ...newLoanApplicationFromDataBase.responsible.person,
          id: newLoanApplicationFromDataBase.responsible.id,
        },
      },
    };
  }

  async findAll(): Promise<Response<LoanApplicationModel | []>> {
    const loanApplications = await this.loanApplicationRepository.find({
      relations: {
        applicant: { person: true },
        responsible: { person: true },
      },
    });

    if (!loanApplications || loanApplications.length === 0)
      throw new NotFoundException({
        ...this._response,
        success: false,
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Loan application not found',
      });

    const loanApplicationWithFormat =
      await this.utilsService.formatLoanApplications(loanApplications);

    return {
      ...this._response,
      data: loanApplicationWithFormat,
    };
  }

  async findOne(id: number): Promise<Response<LoanApplicationModel | []>> {
    const loanApplication = await this.loanApplicationRepository.find({
      where: { id },
      relations: {
        applicant: { person: true },
        responsible: { person: true },
      },
    });

    if (!loanApplication || loanApplication.length === 0)
      throw new NotFoundException({
        ...this._response,
        success: false,
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Loan application not found',
      });

    const loanApplicationWithFormat =
      await this.utilsService.formatLoanApplications(loanApplication);

    return {
      ...this._response,
      data: loanApplicationWithFormat[0],
    };
  }
}
