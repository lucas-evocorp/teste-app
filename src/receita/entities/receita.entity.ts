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

@Entity({ name: 'receitas' })
export class Receita {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column('decimal', { precision: 17, scale: 9 })
  amount: number;

  @ApiProperty()
  @Column()
  category: string;

  // @ManyToOne(() => User, (user) => user.receitas, { eager: true })
  // @JoinColumn({ name: 'usersId' })
  // user: User;
  @ManyToOne(() => User, (user) => user.receitas)
  @JoinColumn({ name: 'usersId' })
  user: User;

  @ApiProperty()
  @Column()
  usersId: number;

  @ApiProperty()
  @CreateDateColumn()
  createdat: Date;
}
