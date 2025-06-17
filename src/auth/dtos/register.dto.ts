import { IsEmail, IsNotEmpty, IsString, IsIn, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({message:'name should not be empty'})
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
