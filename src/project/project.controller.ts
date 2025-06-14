// import { Controller } from '@nestjs/common';
// import { ProjectService } from './project.service';

// @Controller('project')
// export class ProjectController {
//   constructor(private readonly projectService: ProjectService) {}
// }
import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, ValidationPipe, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dtos/CreateProject.dto'; 
import { UpdateProjectDto } from './dtos/UpdateProject.dto';
import { Roles } from 'src/decorator/role.decorator'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guards';

@Controller('projects')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  @UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
  @Post()
  create(@Body(ValidationPipe) createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }
  @Put(':projectId/assign/:userId')
assignProject(
  @Param('projectId') projectId: string,
  @Param('userId') userId: string,
) {
  return this.projectService.assignProjectToUser(+projectId, +userId);
}


  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.remove(id);
  }
}

