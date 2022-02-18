import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDespesaDto } from './dto/create-despesa.dto';
import { UpdateDespesaDto } from './dto/update-despesa.dto';
import { Despesa } from './entities/despesa.entity';

@Injectable()
export class DespesaService {
  constructor(
    @InjectRepository(Despesa)
    private desrepository: Repository<Despesa>,
  ) {}
  create(createDespesaDto: CreateDespesaDto) {
    return this.desrepository.save(createDespesaDto);
  }

  findAll() {
    return this.desrepository.find();
  }

  findOne(id: number) {
    return this.desrepository.findOneOrFail(id);
  }

  update(id: number, updateDespesaDto: UpdateDespesaDto) {
    return this.desrepository.update(id, updateDespesaDto);
  }

  remove(id: number) {
    return this.desrepository.delete(id);
  }
}
