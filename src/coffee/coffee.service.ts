import { Coffee } from './entities/coffee.entity';
import {
  HttpException,
  Injectable,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
// server 是数据交互的方法
@Injectable()
export class CoffeeService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'roast',
      brand: 'Brew',
      flavors: ['chocolate', 'vanilla'],
    },
  ];
  findAll() {
    return this.coffees;
  }
  findOne(id: string) {
    const coffee = this.coffees.find((coffee) => coffee.id == +id);
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
  create(createCoffeeDto: any) {
    this.coffees.push(createCoffeeDto);
    return this.coffees;
  }
  update(id: string) {
    const coffeeIndex = this.coffees.findIndex((coffee) => coffee.id == +id);
    if (coffeeIndex >= 0) {
      // this.coffees.splice(coffeeIndex, 1);
    }
  }
  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex((coffee) => coffee.id == +id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
    return this.coffees;
  }
}
