import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MailerService } from '../shared/mailer.service';
import { CreateProjectDto } from './dtos/CreateProject.dto';
import { UpdateProjectDto } from './dtos/UpdateProject.dto';
import { Project } from 'generated/prisma';
import * as ejs from 'ejs';
import * as path from 'path';

@Injectable()
export class ProjectService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailerService: MailerService,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    return this.prisma.project.create({
      data: {
        ...createProjectDto,
        isCompleted: createProjectDto.isCompleted ?? false,
      },
    });
  }

  async assignProjectToUser(projectId: number, userId: number) {
    // Find and validate user
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Find and validate project
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }

    // Update the user to assign the project
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        projectId,
      },
    });

    try {
      // Prepare template data
      const templateData = {
        user: {
          name: user.name,
          email: user.email,
        },
        project: {
          name: project.name,
          description: project.description || null,
          endDate: project.endDate || null,
        },
        message: null, // You can add a custom message here if needed
        projectUrl: `${process.env.FRONTEND_URL}/projects/${project.id}`, // Adjust URL as needed
      };

      const templateString = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px 20px; text-align: center; }
            .content { padding: 30px; }
            .project-card { background: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0; border-radius: 5px; }
            .project-name { font-size: 20px; font-weight: bold; color: #2c3e50; margin-bottom: 10px; }
            .button { display: inline-block; background: #667eea; color: white; text-decoration: none; padding: 12px 30px; border-radius: 25px; font-weight: bold; }
            .footer { background: #2c3e50; color: white; padding: 20px; text-align: center; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Project Assignment</h1>
              <p>You've been added to an exciting new project!</p>
            </div>
            <div class="content">
              <h2>Hello <%= user.name %>,</h2>
              <p>Great news! You have been assigned to a new project.</p>
              <div class="project-card">
                <div class="project-name"><%= project.name %></div>
                <% if (project.description) { %>
                  <p style="color: #666;"><%= project.description %></p>
                <% } %>
                <p><strong>Assigned Date:</strong> <%= new Date().toLocaleDateString() %></p>
                <% if (project.endDate) { %>
                  <p><strong>End Date:</strong> <%= new Date(project.endDate).toLocaleDateString() %></p>
                <% } %>
              </div>
              <% if (projectUrl) { %>
                <div style="text-align: center; margin: 30px 0;">
                  <a href="<%= projectUrl %>" class="button">View Project Details</a>
                </div>
              <% } %>
            </div>
            <div class="footer">
              <p>&copy; <%= new Date().getFullYear() %> Your Company. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `;

      const htmlContent = ejs.render(templateString, templateData);

      // Send email notification using the template
      await this.mailerService.sendMail(
        user.email,
        'You have been assigned to a new project',
        `Hello ${user.name}, you have been assigned to a new project: ${project.name}.`, // fallback text
        htmlContent
      );
    } catch (emailError) {
      console.error('Failed to send project assignment email:', emailError);
    }

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
