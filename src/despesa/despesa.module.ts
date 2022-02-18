import { Module } from '@nestjs/common';
import { DespesaService } from './despesa.service';
import { DespesaController } from './despesa.controller';
import { Despesa } from './entities/despesa.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Despesa])],
  controllers: [DespesaController],
  providers: [DespesaService],
  exports: [DespesaService],
})
export class DespesaModule {}
