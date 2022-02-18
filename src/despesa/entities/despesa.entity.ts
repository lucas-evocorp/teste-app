import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'despesas' })
export class Despesa {
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
