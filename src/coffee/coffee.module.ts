import { CoffeeService } from './coffee.service';
import { CoffeeController } from './coffee.controller';
import { Module } from '@nestjs/common';
import { CoffeeSchema } from './schema/coffee.schema';
import { MongooseModule } from '@nestjs/mongoose';
// 这里的 name:'User' 为数据库表名称与 service 中注入的表名称对应两者不一样会报错
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: CoffeeSchema }]),
  ],
  controllers: [CoffeeController],
  providers: [CoffeeService],
})
export class CoffeeModule {}
