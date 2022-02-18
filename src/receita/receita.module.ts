import { Module } from '@nestjs/common';
import { ReceitaService } from './receita.service';
import { ReceitaController } from './receita.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receita } from './entities/receita.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Receita]), UsersModule],
  controllers: [ReceitaController],
  providers: [ReceitaService],
  exports: [ReceitaService],
})
export class ReceitaModule {}
