/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsPhoneNumber,
  IsUrl,
  Matches,
} from 'class-validator';
import { UserRole } from '../types/user.type';
import { Transform } from 'class-transformer';

export class RegisterDto {
  @IsEmail()
  @Transform(({ value }: { value: string }) => value.trim())
  @Matches(/^(?=.*[A-Z])(?=.*\d).+$/, {
    message: 'Password must contain uppercase and number',
  })
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsPhoneNumber('IN') // or 'IN' for India
  phone?: string;

  @IsOptional()
  @IsUrl()
  avatarUrl?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  @IsBoolean()
  isEmailVerified?: boolean;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
