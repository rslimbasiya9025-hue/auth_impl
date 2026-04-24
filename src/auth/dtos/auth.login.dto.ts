import { Transform } from 'class-transformer';
import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @Transform(({ value }: { value: string }) => value.trim())
  @Matches(/^(?=.*[A-Z])(?=.*\d).+$/, {
    message: 'Password must contain uppercase and number',
  })
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}
