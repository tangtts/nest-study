import { IsString } from 'class-validator';
/**
 * @dectortions 描述类型
 * @tutorial https://www.npmjs.com/package/class-validator
 * @export
 * @class CreateCoffeeDto
 */
export class CreateCoffeeDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly brand: string;
  @IsString({ each: true }) // 每一项必须是个string
  readonly flavors: string[];
}
