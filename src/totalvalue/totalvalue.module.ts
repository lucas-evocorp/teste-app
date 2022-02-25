import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { DespesaModule } from 'src/despesa/despesa.module';

import { Despesa } from 'src/despesa/entities/despesa.entity';
import { Receita } from 'src/receita/entities/receita.entity';
import { ReceitaModule } from 'src/receita/receita.module';

import { UsersModule } from 'src/users/users.module';
import { TotalValueController } from './totalvalue.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Receita]),
    TypeOrmModule.forFeature([Despesa]),
    UsersModule,
    ReceitaModule,
    DespesaModule,
    AuthModule,
  ],
  controllers: [TotalValueController],
  providers: [],
  exports: [],
})
export class TotalValueModule {}
