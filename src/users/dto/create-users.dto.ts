import { IsString,IsNotEmpty,MinLength } from 'class-validator';
import { IsMatch } from 'src/customerDto/match.dto';
/**
 * @dectortions 描述类型
 * @tutorial https://www.npmjs.com/package/class-validator
 * @export
 * @class UsereDto
 */
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  readonly password: string;
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  @IsMatch("password")
  readonly rePassword: string;
}
