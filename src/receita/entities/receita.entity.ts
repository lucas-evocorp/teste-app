import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'receitas' })
export class Receita {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  amount: number;

  @Column()
  category: string;

  @Column()
  user_id: number;
}
