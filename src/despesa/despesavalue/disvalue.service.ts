import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Despesa } from '../entities/despesa.entity';

@Injectable()
export class DisvalueService {
  constructor(
    @InjectRepository(Despesa)
    private repository: Repository<Despesa>,
  ) {}

  async findDispvalue(userId: number): Promise<number> {
    const dsum = await this.repository
      .createQueryBuilder('despesas')
      .select(['SUM(amount)'])
      .where({ usersId: userId })
      .getRawOne();
    return dsum.sum;
  }

  DisById(id: number) {
    return this.repository.findOneOrFail(+id);
  }
}
