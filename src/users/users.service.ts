import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  Res,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserAuth } from 'src/auth/interfaces/IUserAuth-.interface';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateEmailInterface } from './dto/update-email.interface';
import { UpdatePassInterface } from './dto/update-pass.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (await this.findEmailUser(createUserDto.email)) {
      throw new ForbiddenException('usuario ja existe');
    }
    this.usersRepository.save(createUserDto);
    return {
      message: 'usuario cadastrado com sucesso',
      email: createUserDto.email,
      name: createUserDto.name,
    };
  }
  async saveprofileimage(file: string, id: number) {
    const url = 'http://192.168.200.253:3333/user/upload/profile/';
    const user = await this.usersRepository.findOne(id);
    user.profileimage = url + file;

    return await this.usersRepository.save(user);
  }

  async findEmailUser(email: string) {
    return this.usersRepository.findOne({ email });
  }

  async findpic(id: number) {
    const user = await this.usersRepository.findOne(id);

    // console.log(image);

    return user.profileimage;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne(id);
    // return user;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      profile: user.profileimage,
    };

    // console.log(user);
  }

  async updatepass(
    id: number,
    updatepass: UpdatePassInterface,
    updateuserdto: UpdateUserDto,
  ) {
    const user = await this.usersRepository.findOne(id);
    // console.log(user.password);
    if (user && user.password === updatepass.beforepass) {
      return await this.usersRepository.update(id, updateuserdto);
    }
    throw new HttpException(
      'senha nao corresponde a anterior',
      HttpStatus.FORBIDDEN,
    );
  }
  async updateemail(
    id: number,
    updateemail: UpdateEmailInterface,
    updateuserdto: UpdateUserDto,
  ) {
    const user = await this.usersRepository.findOne(id);
    // console.log(user.password);
    if (user.email === updateemail.beforeemail) {
      return await this.usersRepository.update(id, updateuserdto);
    }
    throw new HttpException(
      'email nao corresponde a anterior',
      HttpStatus.FORBIDDEN,
    );
  }

  async remove(id: number) {
    await this.usersRepository.delete(+id);
  }
}
