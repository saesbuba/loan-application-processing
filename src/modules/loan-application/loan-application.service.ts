import {
  Injectable,
  HttpStatus,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateLoanApplicationDto } from './dto/create-loan-application.dto';
import { LoanApplication } from './entities/loan-application.entity';
import { ApplicantService } from '../applicant/applicant.service';
import { ResponsibleService } from '../responsible/responsible.service';

import { LoanApplicationModel } from './data-models/loan-application-response-model';
import { ResponseModel } from '../../common-data-models/response.model';

import { UtilsService } from './utils.service';

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
  ): Promise<ResponseModel<LoanApplicationModel | []>> {
    const { applicant: applicantDto, responsible: responsibleDto } =
      createLoanApplicationDto;

    const [applicant, responsible] = await Promise.all([
      applicantDto.id
        ? this.applicantService.findOne(applicantDto.id)
        : this.applicantService.create(applicantDto),
      responsibleDto.id
        ? this.responsibleService.findOne(responsibleDto.id)
        : this.responsibleService.create(responsibleDto),
    ]).catch((error) => {
      throw new InternalServerErrorException({
        ...this._response,
        success: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    });

    const loanApplication = new LoanApplication();
    loanApplication.loanType = createLoanApplicationDto.loanType;
    loanApplication.loanAmount = createLoanApplicationDto.loanAmount;
    loanApplication.applicationDate = new Date(
      createLoanApplicationDto.applicationDate,
    );
    loanApplication.remarks = createLoanApplicationDto.remarks ?? '';
    loanApplication.applicant = applicant;
    loanApplication.responsible = responsible;

    const createdLoanApplication =
      await this.loanApplicationRepository.save(loanApplication);

    return {
      ...this._response,
      data: this.utilsService.formatLoanApplication(createdLoanApplication),
    };
  }

  async findAll(): Promise<ResponseModel<LoanApplicationModel | []>> {
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

    return {
      ...this._response,
      data: this.utilsService.formatLoanApplications(loanApplications),
    };
  }

  async findOne(id: number): Promise<ResponseModel<LoanApplicationModel | []>> {
    const loanApplication = await this.loanApplicationRepository.findOne({
      where: { id },
      relations: {
        applicant: { person: true },
        responsible: { person: true },
      },
    });

    if (!loanApplication)
      throw new NotFoundException({
        ...this._response,
        success: false,
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Loan application not found',
      });

    return {
      ...this._response,
      data: this.utilsService.formatLoanApplication(loanApplication),
    };
  }
}
