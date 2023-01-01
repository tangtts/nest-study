import { Injectable, Post, Req, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/users/schema/user.schema';
import { CreateUserDto } from './dto/create-users.dto';
// import { JwtService } from '@nestjs/jwt'
// import { AuthGuard } from '@nestjs/passport';
@Injectable()
export class UsersService {
  private readonly users: any[];
  constructor(
    @InjectModel('users') private UserModel: Model<UserDocument>,
    ) {
      this.users = [
        {
          userId: 1,
          username: 'john',
          password: 'changeme',
        },
        {
          userId: 2,
          username: 'chris',
          password: 'secret',
        },
        {
          userId: 3,
          username: 'maria',
          password: 'guess',
        },
      ];
    }

  async findOne(username: string):Promise<any> {
    return this.users.find(user => user.username === username);
    // return this.UserModel.findOne({ username })
  }
  
  async createOne(createUserDto: CreateUserDto) {
    const createUser = new this.UserModel( createUserDto );
    const temp = await createUser.save();
    return temp;
  }

  // @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(user:CreateUserDto) {
    return {}
    // const payload = { username: user.username, password: user.password };
    // return {
    //   access_token: this.jwtService.sign(payload),
    // };
  }
}
