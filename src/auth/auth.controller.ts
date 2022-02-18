import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
// import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}
  //   @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Body() createauthdto: CreateAuthDto) {
    return this.authservice.validateUser(createauthdto);
  }
}
