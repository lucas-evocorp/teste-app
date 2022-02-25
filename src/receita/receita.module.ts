import { Module } from '@nestjs/common';
import { ReceitaService } from './receita.service';
import { ReceitaController } from './receita.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receita } from './entities/receita.entity';
import { UsersModule } from 'src/users/users.module';
import { RecValueService } from './receitavalue/recvalue.service';
import { RecvalueController } from './receitavalue/recvalue.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Receita]), UsersModule],
  controllers: [ReceitaController, RecvalueController],
  providers: [ReceitaService, RecValueService],
  exports: [RecValueService, ReceitaService],
})
export class ReceitaModule {}
