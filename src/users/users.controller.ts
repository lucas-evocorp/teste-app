import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Res,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IndexUser } from 'src/swagger/index-users.swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserAuth } from 'src/auth/decorators/user-auth';
import { IUserAuth } from 'src/auth/interfaces/IUserAuth-.interface';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/utils/file-uploading.utils';
import { ImageProfile } from './dto/imageprofile.interface';
import { User } from './entities/user.entity';

@Controller('user')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'endpoint responsavel por cadastrar novo usuario.',
  })
  @ApiResponse({
    status: 201,
    description: 'usuario cadastrado com sucesso',
    type: IndexUser,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('authenticate')
  findOneauth(@UserAuth() usuarioauth: IUserAuth) {
    this.usersService.findOne(usuarioauth.userId);
    return {
      Id: usuarioauth.userId,
      user: usuarioauth.username,
    };
  }

  @Get()
  @ApiOperation({
    summary: 'endpoint responsavel por listar todos os usuarios.',
  })
  @ApiResponse({
    status: 201,
    description: 'usuario listados com sucesso',
    isArray: true,
    type: IndexUser,
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'endpoint responsavel por listar usuarios por ID',
  })
  @ApiResponse({
    status: 200,
    description: 'usuario listado com sucesso',
    isArray: true,
    type: IndexUser,
  })
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'endpoint responsavel por atualizar informações do usuario.',
  })
  @ApiResponse({
    status: 200,
    description: 'usuario atualizado com sucesso',
    isArray: true,
    type: IndexUser,
  })
  @UseGuards(AuthGuard('jwt'))
  update(
    @UserAuth() usuarioauth: IUserAuth,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(usuarioauth.userId, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'endpoint responsavel por deletar usuario.',
  })
  @ApiResponse({
    status: 200,
    description: 'usuario listado com sucesso',
    isArray: true,
    type: IndexUser,
  })
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
  @Post('/uploads')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() File, @Req() req) {
    const user: User = req.user.user;
  }

  @Get('file/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './upload' });
  }
}
