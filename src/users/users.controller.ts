import {
  Body,
  Controller,
  Param,
  Post,
  Req,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { CreateUserDto } from './dto/create-users.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { createWriteStream } from 'fs';
import  { join,normalize } from 'path';
import * as OSS from 'ali-oss';
@Controller('users')
export class UsersController {
  private client: OSS;
  constructor(private readonly userService: UsersService) {
    this.client = new OSS({
      region: 'oss-cn-hangzhou',
      accessKeyId: 'LTAI5t9Uqq1LJauqRM6t8hSS',
      accessKeySecret: 'uhCLz1aAbzb5XjXI74Rb5wtz2b8Abk',
      bucket: 'shuokuntang',
    });
  }

  @Post('register')
  async register(@Body() param: CreateUserDto): Promise<any> {
    return this.userService.createOne(param);
  }

  @Post('login')
  async login(@Body() param: CreateUserDto): Promise<any> {
    return this.userService.login(param);
  }

  @HttpCode(HttpStatus.OK)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ): Promise<any> {
    console.log(file);
    const writeImage = createWriteStream(
      join(__dirname, '..', '../public/upload', `${file.originalname}`),
    );
    writeImage.write(file.buffer);
    // TODO 不能直接返回可以预览的链接
    let r = await this.client.put(file.originalname, file.buffer, {
      headers: {
        "Content-Disposition":"inline",
      },
    });
    return res.status(200).send({
      msg: r.url,
    });
  }
}
