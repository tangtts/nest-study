import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsNumber,
  buildMessage,
} from 'class-validator';
import { IsMatch } from 'src/customerDto/match.dto';
/**
 * @dectortions 描述类型
 * @tutorial https://www.npmjs.com/package/class-validator
 * @export
 * @class UsereDto
 */
export class RegisterUserDto {
  @IsString()
  @IsNotEmpty({
    message: "username不能为空"
  })
  readonly username: string;

  @IsNumber({},
    {
      message: 'Password必须是个数字',
    })
  @MinLength(6)
  @IsNotEmpty({
    message: "password不能为空"
  })
  readonly password: string;

  @IsNumber(
    {},
    {
      message: 'rePassword必须是个数字',
    },
  )
  @MinLength(6)
  @IsNotEmpty()
  @IsMatch('password', {
    message: "rePassword与password 不相等"
  })
  readonly rePassword: string;
}
