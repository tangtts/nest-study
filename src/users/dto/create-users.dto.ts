import { IsString } from 'class-validator';
/**
 * @dectortions 描述类型
 * @tutorial https://www.npmjs.com/package/class-validator
 * @export
 * @class UsereDto
 */
export class CreateUserDto {
  @IsString()
  readonly username: string;
  @IsString()
  readonly password: string;
}