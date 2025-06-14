// import { Controller } from '@nestjs/common';
// import { ProjectService } from './project.service';

// @Controller('project')
// export class ProjectController {
//   constructor(private readonly projectService: ProjectService) {}
// }
import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dtos/CreateProject.dto'; 
import { UpdateProjectDto } from './dtos/UpdateProject.dto';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

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

