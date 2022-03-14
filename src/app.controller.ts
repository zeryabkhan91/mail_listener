import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { MailService } from './mail/mail.service';
import { Email } from './mail/models/email.interface';

@Controller()
export class AppController {
  constructor(private readonly mailService: MailService) {}

  @EventPattern('send_email')
  async sendEmail(email: Email) {
    try {
      console.log('Mail Listener:: Received Email', email);

      await this.mailService.sendEmail(email);

      console.log('Mail Listener:: Email Sent');
    } catch (err) {
      console.log('Something bad happened at server', err);
    }
  }
}
