import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAuth } from 'src/auth/decorators/user-auth';
import { IUserAuth } from 'src/auth/interfaces/IUserAuth-.interface';
import { IndexDespesa } from 'src/swagger/index-despesa.swagger';
import { Repository } from 'typeorm';
import { DespesaService } from './despesa.service';
import { CreateDespesaDto } from './dto/create-despesa.dto';
import { UpdateDespesaDto } from './dto/update-despesa.dto';
import { Despesa } from './entities/despesa.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('despesa')
@ApiTags('despesa')
export class DespesaController {
  constructor(
    @InjectRepository(Despesa)
    private despesaRepository: Repository<Despesa>,
    private readonly despesaService: DespesaService,
  ) {}

  @Post()
  @ApiOperation({
    summary:
      'endpoint responsavel por registrar as despesas do usuario autenticado',
  })
  @ApiResponse({
    status: 201,
    description: 'despesa registrada com sucesso',

    type: IndexDespesa,
  })
  create(
    @UserAuth() usuarioAuth: IUserAuth,
    @Body() createDespesaDto: CreateDespesaDto,
  ) {
    const despesa = new Despesa();
    despesa.amount = createDespesaDto.amount;
    despesa.category = createDespesaDto.category;
    despesa.title = createDespesaDto.title;
    despesa.usersId = usuarioAuth.userId;
    return this.despesaRepository.save(despesa);
  }

  @Get()
  @ApiOperation({
    summary:
      'Endpoint responsavel listar todas as despesas registradas por todos os usuarios',
  })
  @ApiResponse({
    status: 200,
    description: 'despesas listadas com sucesso',

    type: IndexDespesa,
  })
  findAll() {
    return this.despesaService.findAll();
  }

  @Get('des/auth')
  @ApiOperation({
    summary:
      'Endpoint responsavel por listar todas as despesas registradas pelo usuario autenticado.',
  })
  @ApiResponse({
    status: 200,
    description: 'despesas do usuario listadas com sucesso',

    type: IndexDespesa,
  })
  async findAllByUserId(
    @UserAuth() usuarioAuth: IUserAuth,
  ): Promise<Despesa[]> {
    return await this.despesaService.findAllByUserId(usuarioAuth.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.despesaService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary:
      'Endpoint responsavel por atualizar as informações da despesa do usuario',
  })
  @ApiResponse({
    status: 200,
    description: 'despesa atualizada com sucesso',

    type: IndexDespesa,
  })
  update(@Param('id') id: string, @Body() updateDespesaDto: UpdateDespesaDto) {
    return this.despesaService.update(+id, updateDespesaDto);
  }

  @Delete('delete/:id')
  @ApiOperation({
    summary: 'Endpoint responsavel por deletar despesa do usuario.',
  })
  @ApiResponse({
    status: 200,
    description: 'despesa do usuario deletada com sucesso',

    type: IndexDespesa,
  })
  findremoveID(@Param('id') id: string) {
    return this.despesaService.remove(+id);
  }
}
