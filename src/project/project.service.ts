// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class ProjectService {}
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dtos/CreateProject.dto'; 
import { UpdateProjectDto } from './dtos/UpdateProject.dto'; 
import { Project } from 'generated/prisma';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto):Promise<Project> {
    return this.prisma.project.create({
      data:{ ...createProjectDto,isCompleted: createProjectDto.isCompleted ?? false,},
    });
  }
  async assignProjectToUser(projectId: number, userId: number) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        projectId,
      },
    });
  }
  

  async findAll() {
    return this.prisma.project.findMany({
      include: {
        user: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.project.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    return this.prisma.project.update({
      where: { id },
      data: updateProjectDto,
    });
  }

  async remove(id: number) {
    return this.prisma.project.delete({
      where: { id },
    });
  }
}

