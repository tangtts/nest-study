import { HttpException, Injectable, Post, Req, UseGuards, HttpStatus, UseFilters, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/users/schema/user.schema';
import { RegisterUserDto } from './dto/register-users.dto';
import { LoginUserDto } from './dto/login-users.dto';
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel('users') private UserModel: Model<UserDocument>,
    private jwtService: JwtService
    ) {}

  async findOne(username: string):Promise<any> {
    return this.UserModel.findOne({ username })
  }
  
  async createOne(createUserDto: LoginUserDto) {
    const createUser = new this.UserModel( createUserDto );
    const temp = await createUser.save();
    return temp;
  }
  

  async login(user:LoginUserDto) {
    // 先看数据库中是否有这个人
   const person =  await this.findOne(user.username)
    if(person){
      const payload = { username: user.username, password: user.password };
      let r =  this.jwtService.sign(payload.username+payload.password,{secret:"abcd"})
       return r;
    }else {
      throw new ForbiddenException("用户没找到2");
    }
  }
}
