import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserAuth } from 'src/auth/decorators/user-auth';
import { IUserAuth } from 'src/auth/interfaces/IUserAuth-.interface';
import { DisvalueService } from 'src/despesa/despesavalue/disvalue.service';
import { RecValueService } from 'src/receita/receitavalue/recvalue.service';
import { IndexTotalValue } from 'src/swagger/index-totalvalue.swagger';

@UseGuards(AuthGuard('jwt'))
@Controller('totalvalue')
@ApiTags('totalvalue')
export class TotalValueController {
  constructor(
    private recservice: RecValueService,
    private disService: DisvalueService,
  ) {}
  @Get('total/value')
  @ApiOperation({
    summary:
      'endpoint responsavel exibir resultado da diferença das despesas e receitas do usuario autenticado.',
  })
  @ApiResponse({
    status: 200,
    description: 'valor operado com sucesso',

    type: IndexTotalValue,
  })
  async totalvalue(@UserAuth() usuarioAuth: IUserAuth) {
    const receita = await this.recservice.findRecvalue(usuarioAuth.userId);
    const despesa = await this.disService.findDispvalue(usuarioAuth.userId);
    const subtotalvalue = receita - despesa;
    return {
      valortotal: subtotalvalue,
    };
  }
}
