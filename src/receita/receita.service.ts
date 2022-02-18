import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
// import { CreateReceitaDto } from './dto/create-receita.dto';
import { UpdateReceitaDto } from './dto/update-receita.dto';
import { Receita } from './entities/receita.entity';

@Injectable()
export class ReceitaService {
  constructor(
    @InjectRepository(Receita)
    private receitaRepository: Repository<Receita>,

    private userservice: UsersService,
  ) {}
  // screateReceitaDto: CreateReceitaDto
  async create() {
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
  }
  async findAll() {
    return this.receitaRepository.find();
  }
  async findOne(id: number) {
    return this.receitaRepository.findOneOrFail(id);
  }
  async update(id: number, updateReceitaDto: UpdateReceitaDto) {
    return this.receitaRepository.update(+id, updateReceitaDto);
  }
  async remove(id: number) {
    return this.receitaRepository.delete(id);
  }
}
