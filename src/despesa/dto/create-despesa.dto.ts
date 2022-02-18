import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDespesaDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsNumber()
  @IsNotEmpty()
  amount: number;
  @IsString()
  @IsNotEmpty()
  category: string;
}
