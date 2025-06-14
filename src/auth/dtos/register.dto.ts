import { IsEmail, IsNotEmpty, IsString, IsIn, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsIn(['admin', 'user'])
  role: 'admin' | 'user';
}
