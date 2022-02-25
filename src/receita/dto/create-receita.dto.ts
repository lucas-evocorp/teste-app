import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReceitaDto {
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
