import { CoffeeService } from './coffee.service';
import { CoffeeController } from './coffee.controller';
import { Module, ParseIntPipe } from '@nestjs/common';
import { CoffeeSchema } from './schema/coffee.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_PIPE } from '@nestjs/core';
// 这里的 name:'User' 为数据库表名称与 service 中注入的表名称对应两者不一样会报错
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'coffees', schema: CoffeeSchema }]),
  ],
  controllers: [CoffeeController],
  providers: [CoffeeService,{
    provide: APP_PIPE,
    useClass: ParseIntPipe,
  },],
})
export class CoffeeModule {}
