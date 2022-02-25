import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { UpdateReceitaDto } from './dto/update-receita.dto';
import { Receita } from './entities/receita.entity';

@Injectable()
export class ReceitaService {
  constructor(
    @InjectRepository(Receita)
    private receitaRepository: Repository<Receita>,
  ) {}

  async findAll() {
    return this.receitaRepository.find();
  }

  async findbyrecId(userId: number): Promise<Receita[]> {
    return this.receitaRepository.find({
      where: {
        usersId: userId,
      },
    });
  }
  async findOne(id: number) {
    return this.receitaRepository.findOne(id);
  }

  async update(id: number, updateReceitaDto: UpdateReceitaDto) {
    return this.receitaRepository.update(+id, updateReceitaDto);
  }

  async remove(id: number) {
    return this.receitaRepository.delete(id);
  }
}

// forma alternativa, sem o decorator personalidado(apresenta erros) ->

//   const decodetoken = this.authservice.validate(createReceitaDto.token);
//   const usuario = await this.userservice.findOne(decodetoken.id);
//   if (!usuario) {
//     throw new UnauthorizedException('user invalido');
//   }
//   const receita = new Receita();
//   receita.amount = createReceitaDto.amount;
//   receita.category = createReceitaDto.category;
//   receita.title = createReceitaDto.title;
//   receita.user_id = usuario.id;
//   await this.receitaRepository.save(receita);
