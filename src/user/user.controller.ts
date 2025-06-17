import { Body, Controller, Get, Post, ValidationPipe,Param, UseGuards, Delete, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'generated/prisma';
import { CreateUserDto } from './dto/createUserDto'; 
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@Controller('user')
@UseGuards(JwtAuthGuard)
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
  @Patch (':id')
  async updateUser(
    @Param('id') id: string,
    @Body(ValidationPipe) updateUserDto: Partial<CreateUserDto>,
  ) {
    return this.userService.updateUser(+id, updateUserDto);
  }

  
  @Delete (':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(+id);
  }
}



