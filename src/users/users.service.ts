import { ForbiddenException, Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserAuth } from 'src/auth/interfaces/IUserAuth-.interface';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
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
    const url = 'http:localhost:3333/user/upload/profile/';
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
    console.log(user);
  }

  async update(id: number, updateuserdto: UpdateUserDto) {
    const user = await this.usersRepository.findOne(id);

    await this.usersRepository.update(id, updateuserdto);
  }

  async remove(id: number) {
    await this.usersRepository.delete(+id);
  }
}
