import{IsDate, IsEmail, isNotEmpty, IsNotEmpty, IsOptional, IsString} from "class-validator"
export class CreateProjectDto {
  @IsNotEmpty()
  @IsString ()   
  name:string
  
  @IsNotEmpty()
  @IsString () 
  description :string

  @IsNotEmpty()
  
  endDate:Date

  @IsOptional()
  isCompleted?: boolean
  }