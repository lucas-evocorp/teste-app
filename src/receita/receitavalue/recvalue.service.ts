import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Receita } from 'src/receita/entities/receita.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecValueService {
  constructor(
    @InjectRepository(Receita)
    private repository: Repository<Receita>,
  ) {}

  async findRecvalue(userId: number): Promise<number> {
    const recsum = await this.repository
      .createQueryBuilder('receitas')
      .select(['SUM(amount)'])

      .where({ usersId: userId })
      .getRawOne();

    return recsum.sum;
  }

  recbyId(id: number) {
    return this.repository.findOneOrFail(id);
  }
}
