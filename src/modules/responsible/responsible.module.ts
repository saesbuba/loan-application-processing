import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ResponsibleService } from './responsible.service';
import { Responsible } from './entities/responsible.entity';
import { PersonModule } from '../person/person.module';

@Module({
  imports: [PersonModule, TypeOrmModule.forFeature([Responsible])],
  controllers: [],
  providers: [ResponsibleService],
  exports: [ResponsibleService],
})
export class ResponsibleModule {}
