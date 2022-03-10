import { Injectable } from '@nestjs/common';
import * as SendGrid from '@sendgrid/mail';
import { ConfigService } from '@nestjs/config';
import { Email } from './models/email.interface';

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {
    SendGrid.setApiKey(this.configService.get<string>('SEND_GRID_API'));
  }

  getEmail(data: Email): SendGrid.MailDataRequired {
    return {
      to: data.email,
      from: this.configService.get<string>('SEND_GRID_SENDER'),
      subject: data.subject,
      templateId: data.template,
      dynamicTemplateData: data
    };
  }

  async sendEmail(data: Email): Promise<any> {
    try {
      const emailTemplate = this.getEmail(data);

      return await SendGrid.send(emailTemplate);
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  }
}
