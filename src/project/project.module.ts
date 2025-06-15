import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { SharedModule } from 'src/shared/mailer.module';

@Module({
  imports: [SharedModule],
  controllers: [ProjectController],
  providers: [ProjectService,PrismaService],
  exports: [ProjectService],
})
export class ProjectModule {}
