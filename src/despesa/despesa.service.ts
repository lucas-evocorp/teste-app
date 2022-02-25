import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateDespesaDto } from './dto/update-despesa.dto';
import { Despesa } from './entities/despesa.entity';

@Injectable()
export class DespesaService {
  constructor(
    @InjectRepository(Despesa)
    private repository: Repository<Despesa>,
  ) {}

  findAll() {
    return this.repository.find();
  }

  async findAllByUserId(userId: number) {
    return this.repository.find({
      where: {
        usersId: userId,
      },
    });
  }

  findOne(id: number) {
    return this.repository.findOneOrFail(id);
  }

  update(id: number, updateDespesaDto: UpdateDespesaDto) {
    return this.repository.update(id, updateDespesaDto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
//buscar users autenticados, banco

// função de somas
// async somadesp() {
//   return this.repository
//     .createQueryBuilder('despesas')
//     .select('SUM(amount)', 'sum')
//     .getRawOne();
// }

//somar somente um

// const sum = this.repository
//   .createQueryBuilder('despesas')
//   .select(['SUM(amount)'])
//   .where({ usersId: userId })
//   .getRawMany();
// return sum;
