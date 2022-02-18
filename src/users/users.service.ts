import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    await this.usersRepository.save(createUserDto);
  }
  async findEmailUser(email: string) {
    return this.usersRepository.findOne({ email });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
  async findOne(id: number) {
    return await this.usersRepository.findOne(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(+id, updateUserDto);
  }

  async remove(id: number) {
    await this.usersRepository.delete(+id);
  }
}
