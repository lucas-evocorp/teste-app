import { ApiProperty } from '@nestjs/swagger';
import { Despesa } from 'src/despesa/entities/despesa.entity';
import { Receita } from 'src/receita/entities/receita.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column()
  password: string;

  @OneToMany(() => Receita, (receita) => receita.user)
  receitas: Receita[];

  @OneToMany(() => Despesa, (despesa) => despesa.user)
  despesas: Despesa[];

  @CreateDateColumn()
  createdat: Date;
}
