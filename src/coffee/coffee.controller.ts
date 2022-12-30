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
  createOne(@Body() createDto: CreateCoffeeDto,@Res() response:Response) {
    // console.log(createDto instanceof CreateCoffeeDto);
    this.coffeesService.create(createDto);
    return response.status(200).send({ msg:'success' })
  }

  @Delete(':id')
 async remove(@Param('id') id: string, @Res() response:Response) {
   let r = await this.coffeesService.remove(id);
   console.log(r.deletedCount)
   if(r.deletedCount == 1){
     return response.status(200).send({ msg:'success' })
   }else {
    return response.status(200).send({ msg:'已经删除掉' })
   }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto,@Res() response:Response) {
    this.coffeesService.update(id, updateCoffeeDto);
    return response.status(200).send({ msg:'success' })
  }
}
