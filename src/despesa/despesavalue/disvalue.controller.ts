import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserAuth } from 'src/auth/decorators/user-auth';
import { IUserAuth } from 'src/auth/interfaces/IUserAuth-.interface';
import { DisvalueService } from './disvalue.service';

@UseGuards(AuthGuard('jwt'))
@Controller('disvalue')
@ApiTags('valor da despesa')
export class DisvalueController {
  constructor(private readonly disvalueservice: DisvalueService) {}
  @Get('plus/auth')
  @ApiOperation({
    summary:
      'Endpoint responsavel por exibir o resultado da soma de todas as despesas do usuario autenticado',
  })
  async DisValueId(@UserAuth() usuarioAuth: IUserAuth) {
    return await this.disvalueservice.findDispvalue(usuarioAuth.userId);
  }

  @Get(':id')
  findDisById(@Param('id') id: string) {
    return this.disvalueservice.DisById(+id);
  }
}
