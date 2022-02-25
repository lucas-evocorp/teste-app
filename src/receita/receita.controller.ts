import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReceitaService } from './receita.service';
import { CreateReceitaDto } from './dto/create-receita.dto';
import { UpdateReceitaDto } from './dto/update-receita.dto';
import { Receita } from './entities/receita.entity';
import { AuthGuard } from '@nestjs/passport';
import { UserAuth } from 'src/auth/decorators/user-auth';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserAuth } from 'src/auth/interfaces/IUserAuth-.interface';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IndexReceita } from 'src/swagger/index-receita.swagger';

@UseGuards(AuthGuard('jwt'))
@Controller('receita')
@ApiTags('receita')
export class ReceitaController {
  constructor(
    @InjectRepository(Receita)
    private receitaRepository: Repository<Receita>,
    private readonly receitaService: ReceitaService,
  ) {}

  @Post()
  @ApiOperation({
    summary:
      'endpoint responsavel por registrar receitas do usuario autenticado',
  })
  @ApiResponse({
    status: 201,
    description: 'receita registrada  com sucesso',

    type: IndexReceita,
  })
  async create(
    @UserAuth() usuarioAuth: IUserAuth,
    @Body() createReceitaDto: CreateReceitaDto,
  ) {
    const receita = new Receita();
    receita.amount = createReceitaDto.amount;
    receita.category = createReceitaDto.category;
    receita.title = createReceitaDto.title;
    receita.usersId = usuarioAuth.userId;
    return this.receitaRepository.save(receita);
  }
  @Get()
  @ApiOperation({
    summary:
      'Endpoint responsavel listar todas as receitas registradas por todos os usuarios',
  })
  @ApiResponse({
    status: 200,
    description: 'receitas listadas com sucesso',

    type: IndexReceita,
  })
  findAll() {
    return this.receitaService.findAll();
  }

  @Get('rec/auth')
  @ApiOperation({
    summary: 'endpoint responsavel por listar receitas do usuario autenticado.',
  })
  @ApiResponse({
    status: 200,
    description: 'receitas do usuario listadas com sucesso',

    type: IndexReceita,
  })
  async findAllByUserId(
    @UserAuth() usuarioAuth: IUserAuth,
  ): Promise<Receita[]> {
    return await this.receitaService.findbyrecId(usuarioAuth.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.receitaService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary:
      'endpoint responsavel por atualizar informações da receita do usuario.',
  })
  @ApiResponse({
    status: 200,
    description: 'receita atualizada com sucesso',

    type: IndexReceita,
  })
  update(@Param('id') id: string, @Body() updateReceitaDto: UpdateReceitaDto) {
    return this.receitaService.update(+id, updateReceitaDto);
  }

  @Delete('delete/:id')
  @ApiOperation({
    summary: 'endpoint responsavel por deletar receita do usuario autenticado.',
  })
  @ApiResponse({
    status: 200,
    description: 'receitas deletada  com sucesso',

    type: IndexReceita,
  })
  findremoveID(@Param('id') id: string) {
    return this.receitaService.remove(+id);
  }
}

// @Delete('delete/auth')
// delete(@UserAuth() usuarioauth: IUserAuth) {
//   return this.receitaService.remove(usuarioauth.userId);
// }
