import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'generated/prisma'; 
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/createUserDto';


@Injectable()
export class UserService {
    constructor(private prisma:PrismaService){ }
   
    async createUser(dto: CreateUserDto): Promise<User> {
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      return this.prisma.user.create({
        data: {...dto,password: hashedPassword,
        },
      });
    }
    async findUserWithProject(UserId: number) {
      return this.prisma.user.findUnique({
        where: { id: UserId },
        include: { project: true },
      });
    }
    
    
    async findAvailableUsers() {
        return this.prisma.user.findMany({
          where: { projectId: null, role: 'user' },
        });
      }
}
