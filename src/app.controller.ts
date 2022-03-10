import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { MailService } from './mail/mail.service';
import { Email } from './mail/models/email.interface';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly mailService: MailService
  ) {}

  @EventPattern('send_email')
  async sendEmail(email: Email) {
    await this.mailService.sendEmail(email);
  }
}
