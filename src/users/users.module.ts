import { MiddlewareConsumer, Module, NestModule, RequestMethod, Post } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/schema/user.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { logger, LoggerMiddleware } from 'src/middleware/logger.middleware';

@Module({
 imports:[ 
    MongooseModule.forFeature([{ name: 'users', schema: UserSchema }]),
    JwtModule.register({ secret: 'hard!to-guess_secret' })],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    // 可以写入一个类
    // consumer.apply(logger).forRoutes(UsersController)
    // 写入一个urls
    // consumer.apply(logger).forRoutes("users")
    // consumer.apply(logger,LoggerMiddleware).forRoutes("users")
    // consumer.apply(logger,LoggerMiddleware).forRoutes({path:"users/*",method:RequestMethod.POST})

  }
}
