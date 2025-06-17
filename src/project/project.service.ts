
import { Injectable,NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MailerService } from '../shared/mailer.service';
import { CreateProjectDto } from './dtos/CreateProject.dto';
import { UpdateProjectDto } from './dtos/UpdateProject.dto';
import { Project } from 'generated/prisma';
import { MailService } from '../mail/mail.service';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService,private readonly mailService: MailService,) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    return this.prisma.project.create({
      data: {
        ...createProjectDto,
        isCompleted: createProjectDto.isCompleted ?? false,
      },
    });
  }
  
  async assignProjectToUser(projectId: number, userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
  
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });
  
    if (!user || !project) {
      throw new Error('User or Project not found');
    }
  
    // to give project
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { projectId },
    });
  
    // to sen email
    await this.mailService.sendProjectAssignedEmail(user.email, {
      name: user.name,
      project: project.name,
      description:project.description,
      endDate: project.endDate,
    });
  
    return updatedUser;
  }
  
  

  async findAll() {
    return this.prisma.project.findMany({
      include: {
        user: true,
      },
    });
  }

  async findOne(id: number) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    // Check if project exists first
    await this.findOne(id);

    return this.prisma.project.update({
      where: { id },
      data: updateProjectDto,
    });
  }

  async remove(id: number) {
    // Check if project exists first
    await this.findOne(id);

    return this.prisma.project.delete({
      where: { id },
    });
  }
  
}
