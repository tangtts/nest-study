import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import {
  HttpException,
  Injectable,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { CoffeeDocument } from './schema/coffee.schema';
import { InjectModel } from '@nestjs/mongoose';
// server 是数据交互的方法
@Injectable()
export class CoffeeService {
  constructor(
    @InjectModel('coffees') private CoffeeModel: Model<CoffeeDocument>,
  ) {}
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'roast',
      brand: 'Brew',
      flavors: ['chocolate', 'vanilla'],
    },
  ];
  async findAll() {
    const temp = await this.CoffeeModel.find().exec();
    return temp;
    return this.coffees;
  }
 async findOne(id: number) {
    return this.CoffeeModel.find({ id })
    const coffee = this.coffees.find((coffee) => coffee.id == id);
    if (!coffee) {
      //{
      //     "statusCode": 404,
      //     "message": "Coffee #10 not found"
      // }
      // throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    // this.coffees.push({
    //   ...createCoffeeDto,
    //   id: Math.round(Math.random() * 10),
    // });
    // return createCoffeeDto;
    const createUser = new this.CoffeeModel({
      ...createCoffeeDto,
      id: Math.round(Math.random() * 10),
    });
    const temp = await createUser.save();
    return temp;
  }

 async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    await this.CoffeeModel.updateOne({ id },{$set: updateCoffeeDto })
    return 
    const coffeeIndex = this.coffees.findIndex((coffee) => coffee.id == +id);
    if (coffeeIndex >= 0) {
      this.coffees = this.coffees.map((coffee) => {
        if (coffee.id == +id) {
          return { ...coffee, ...updateCoffeeDto };
        } else {
          return coffee;
        }
      });
    }
    return this.coffees;
  }
  
 async remove(id: string): Promise<any> {
   let r = await this.CoffeeModel.deleteOne({ id })
    return r
    const coffeeIndex = this.coffees.findIndex((coffee) => coffee.id == +id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
    return this.coffees;
  }
}
