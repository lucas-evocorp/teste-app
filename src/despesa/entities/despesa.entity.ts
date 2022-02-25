import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'despesas' })
export class Despesa {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @JoinColumn({ name: 'amount ' })
  @Column('decimal', { precision: 17, scale: 9 })
  amount: number;

  @ApiProperty()
  @Column()
  category: string;
  // @ManyToOne(() => User, (user) => user.receitas)
  @ManyToOne(() => User, (user) => user.despesas)
  @JoinColumn({ name: 'usersId ' })
  user: User;

  @ApiProperty()
  @Column()
  usersId: number;

  @ApiProperty()
  @CreateDateColumn()
  createdat: Date;
}
