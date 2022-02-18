import { Controller, Post } from '@nestjs/common';
import { ReceitaService } from './receita.service';
// import { CreateReceitaDto } from './dto/create-receita.dto';
// import { UpdateReceitaDto } from './dto/update-receita.dto';
// import { Receita } from './entities/receita.entity';

@Controller('receita')
export class ReceitaController {
  constructor(private readonly receitaService: ReceitaService) {}
  @Post()
  // createReceitaDto: CreateReceitaDto
  create() {
    // return this.receitaService.create(createReceitaDto);
  }

  // @Get()
  // findAll(): Promise<Receita[]> {
  //   return this.receitaService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.receitaService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateReceitaDto: UpdateReceitaDto) {
  //   return this.receitaService.update(+id, updateReceitaDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.receitaService.remove(+id);
  // }
}
