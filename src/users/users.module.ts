import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/schema/user.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
 imports:[ MongooseModule.forFeature([{ name: 'users', schema: UserSchema }])],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
