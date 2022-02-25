import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserAuth } from 'src/auth/decorators/user-auth';
import { IUserAuth } from 'src/auth/interfaces/IUserAuth-.interface';
import { Indexvaluerec } from 'src/swagger/index-valuerec.swagger';
import { RecValueService } from './recvalue.service';

@UseGuards(AuthGuard('jwt'))
@Controller('recvalue')
@ApiTags('valor da receita')
export class RecvalueController {
  constructor(private readonly recvalueservice: RecValueService) {}
  @Get('plus/auth')
  @ApiOperation({
    summary:
      'Endpoint responsavel por exibir a soma das receitas do usuario autenticado .',
  })
  @ApiResponse({
    status: 200,
    description: 'operação concluida com sucesso',

    type: Indexvaluerec,
  })
  async RecValueId(@UserAuth() usuarioAuth: IUserAuth) {
    return await this.recvalueservice.findRecvalue(usuarioAuth.userId);
  }

  @Get(':id')
  FindRecById(@Param('id') id: number) {
    return this.recvalueservice.recbyId(+id);
  }
}
