import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailModule } from '../mail/mail.module';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [MailModule],
  controllers: [ProjectController],
  providers: [ProjectService,PrismaService,MailService],
})
export class ProjectModule {}
