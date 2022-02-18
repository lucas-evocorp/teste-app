import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Token } from './interfaces/jwt.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtservice: JwtService,
  ) {}

  async validateUser(createauthdto: CreateAuthDto): Promise<any> {
    const user = await this.usersService.findEmailUser(createauthdto.email);
    if (user && user.password === user.password) {
      const payload = { username: user.email, sub: user.id };
      return {
        access_token: this.jwtservice.sign(payload),
      };
    }
  }
}
