import { Module } from '@nestjs/common';
import { DespesaService } from './despesa.service';
import { DespesaController } from './despesa.controller';
import { Despesa } from './entities/despesa.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DisvalueService } from './despesavalue/disvalue.service';
import { DisvalueController } from './despesavalue/disvalue.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Despesa])],
  controllers: [DespesaController, DisvalueController],
  providers: [DespesaService, DisvalueService],
  exports: [DespesaService, DisvalueService],
})
export class DespesaModule {}
