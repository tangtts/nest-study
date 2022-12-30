import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { CoffeeService } from './coffee.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
@Controller('coffee')
export class CoffeeController {
  constructor(private readonly coffeesService: CoffeeService) {}
  @Get()
  // findAll(@Res() response: Response){
  // return response.status(200).send('send all coffee');
  //}
  findAll() {
    return this.coffeesService.findAll();
  }

  @Get('flavors')
  findAllFlavors() {
    return 'This is returns all Flavors';
  }

  // @Get(':id')
  // findOne(@Param() params) {
  //   return `find one ${params.id} coffee`;
  // }
  // http://localhost:3000/coffee/20
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.coffeesService.findOne(id);
  }

  @Get('query')
  findQueryOne(@Query() query) {
    return `find one ${query.id} query coffees`;
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  createOne(@Body() createDto: CreateCoffeeDto) {
    // console.log(createDto instanceof CreateCoffeeDto);
    return this.coffeesService.create(createDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }
}
