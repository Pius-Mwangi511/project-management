
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ProjectService } from 'src/project/project.service';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendProjectAssignedEmail (to: string, data: { name: string; project: string;description:string; endDate: Date }) {
    await this.mailerService.sendMail({
      to:"jkyalo009@gmail.com",
      subject: 'You have been assigned a new project',
      html: `<h1>Hello </h1></br><p>You have been assigned a <strong>Project</strong> </br> check it out.</br> in our website</p>`, 
    //   context: {
    //     name: data.name,
    //     project: data.project,
    //     //deadline: data.deadline.toDateString(),
    //     description: data.description,
    // endDate: data.endDate.toDateString(),
    //   },
    });
  }
}

