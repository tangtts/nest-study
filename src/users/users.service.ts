import { Injectable, Post, Req, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/users/schema/user.schema';
import { CreateUserDto } from './dto/create-users.dto';
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
  
  async createOne(createUserDto: CreateUserDto) {
    const createUser = new this.UserModel( createUserDto );
    const temp = await createUser.save();
    return temp;
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(user:CreateUserDto) {
    const payload = { username: user.username, password: user.password,rePassword:user.rePassword };
   let r =  this.jwtService.sign(payload.username+payload.password,{secret:"abcd"})
    return r;
  }
}
