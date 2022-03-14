import { Inject, Injectable } from '@nestjs/common';
import * as SendGrid from '@sendgrid/mail';
import { ConfigService } from '@nestjs/config';
import { Email } from './models/email.interface';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MailService {
  constructor(
    private readonly configService: ConfigService,
    @Inject('TEST_SERVICE')
    private readonly client: ClientProxy
  ) {
    SendGrid.setApiKey(this.configService.get<string>('SEND_GRID_API'));
  }

  getEmail(data: Email): SendGrid.MailDataRequired {
    const templateId = JSON.parse(data.template).templateKey;
    delete data.template;

    return {
      to: data.email,
      from: this.configService.get<string>('SEND_GRID_SENDER'),
      subject: data.subject,
      templateId,
      dynamicTemplateData: data
    };
  }

  async sendEmail(data: Email): Promise<any> {
    try {
      const emailTemplate = this.getEmail(data);

      await SendGrid.send(emailTemplate);
    } catch (err) {
      this.client.emit('email_failed', data);
      console.log(`Error: ${err}`);
    }
  }
}
