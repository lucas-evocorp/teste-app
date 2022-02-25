import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtservice: JwtService,
  ) {}

  async validateUser(createauthdto: CreateAuthDto): Promise<any> {
    const user = await this.usersService.findEmailUser(createauthdto.email);

    if (user && user.password === createauthdto.password) {
      const payload = { username: user.email, sub: user.id };
      const token = this.jwtservice.sign(payload);

      return {
        access_token: token,
      };
    }
    throw new UnauthorizedException('usuario não existe');
  }
}
