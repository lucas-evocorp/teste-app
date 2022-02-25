import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IndexAuth } from 'src/swagger/index-auth.swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
// import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}
  //   @UseGuards(LocalAuthGuard)
  @Post()
  @ApiOperation({
    summary: 'endpoint responsavel por autenticar o usuario.',
  })
  @ApiResponse({
    status: 200,
    description: 'usuario autenticado com sucesso',
    type: IndexAuth,
  })
  async login(@Body() createauthdto: CreateAuthDto) {
    return this.authservice.validateUser(createauthdto);
  }
}
