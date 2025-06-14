import{IsEmail, isNotEmpty, IsNotEmpty, IsOptional, IsString} from "class-validator"
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    role: 'admin' | 'user';

    @IsOptional()
    projectId?:number
  }
  