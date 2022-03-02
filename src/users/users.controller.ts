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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePassInterface } from './dto/update-pass.interface';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IndexUser } from 'src/swagger/index-users.swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserAuth } from 'src/auth/decorators/user-auth';
import { IUserAuth } from 'src/auth/interfaces/IUserAuth-.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateEmailInterface } from './dto/update-email.interface';

export const storage = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};
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
  async findOneauth(@UserAuth() usuarioauth: IUserAuth) {
    return this.usersService.findOne(usuarioauth.userId);
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

  @Get('upload/profile/:imagename')
  findOne(@Param('imagename') profile, @Res() res) {
    return res.sendFile(profile, { root: 'uploads' });
  }

  @Put('alteratepass')
  @ApiResponse({
    status: 200,
    description: 'usuario atualizado com sucesso',
    isArray: true,
    type: IndexUser,
  })
  @UseGuards(AuthGuard('jwt'))
  updatepass(
    @UserAuth() usuarioauth: IUserAuth,
    @Body() updateuserdto: UpdateUserDto,
    @Body() updatepassdto: UpdatePassInterface,
  ) {
    // console.log(updatepassdto.beforepass);

    return this.usersService.updatepass(
      usuarioauth.userId,
      updatepassdto,
      updateuserdto,
    );
  }
  @Put('alteratemail')
  @ApiResponse({
    status: 200,
    description: 'usuario atualizado com sucesso',
    isArray: true,
    type: IndexUser,
  })
  @UseGuards(AuthGuard('jwt'))
  updateemail(
    @UserAuth() usuarioauth: IUserAuth,
    @Body() updateuserdto: UpdateUserDto,
    @Body() updateemail: UpdateEmailInterface,
  ) {
    // console.log(updatepassdto.beforepass);

    return this.usersService.updateemail(
      usuarioauth.userId,
      updateemail,
      updateuserdto,
    );
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

  @UseGuards(AuthGuard('jwt'))
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', storage))
  uploadFile(@UploadedFile() file, @UserAuth() usuarioauth: IUserAuth) {
    const profileimage = file.filename;

    return this.usersService.saveprofileimage(profileimage, usuarioauth.userId);
  }

  //
  // showImage() {}
}
