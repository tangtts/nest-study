import { RegisterUserDto } from './register-users.dto';

import { OmitType, PartialType } from '@nestjs/mapped-types';
export class  LoginUserDto extends OmitType(RegisterUserDto,[
  "rePassword"
]) {}
