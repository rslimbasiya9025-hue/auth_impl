import { PartialType } from '@nestjs/mapped-types';
import { RegisterDto } from './user.register.dto';

export class UpdateUserDto extends PartialType(RegisterDto) {}
