import { Body, Controller, Get, Post, ValidationPipe,Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'generated/prisma';
import { CreateUserDto } from './dto/createUserDto'; 


@Controller('user')
export class UserController {
    constructor(private userService:UserService){ }
    @Post()
  async createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    const { name, email, password, role } = createUserDto;
    return this.userService.createUser(createUserDto);
  }
  @Get(':id/project')
getAssignedProject(@Param('id') id: string) {
  return this.userService.findUserWithProject(+id);
}

    @Get('available')
  async findAvailableUsers(): Promise<User[]> {
    return this.userService.findAvailableUsers();
  }
}



