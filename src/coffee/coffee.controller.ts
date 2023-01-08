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
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UsePipes,
} from '@nestjs/common';
import { Response,Request } from 'express';
// import { ParseIntPipe } from 'src/pipes/parse-int.pipe';
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
  @Get('/find/:id')
  findOne(@Param('id') id: number) {
    return this.coffeesService.findOne(id);
  }

  @Get('query')
  // @UsePipes(ParseIntPipe)
  findQueryOne(@Query("id",ParseIntPipe) query) {
    console.log(query)
    return `find one query coffees`;
  }

  @Post('createOne')
  @HttpCode(HttpStatus.OK)
  createOne(@Body() createDto: CreateCoffeeDto,@Res() response:Response,@Req() req:Request) {
    // console.log(createDto instanceof CreateCoffeeDto);
    this.coffeesService.create(createDto);
    return response.status(200).send({ msg:'success' })
  }

  @Delete(':id')
 async remove(@Param('id') id: string, @Res() response:Response) {
   let r = await this.coffeesService.remove(id);
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
