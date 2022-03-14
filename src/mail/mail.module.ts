import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MailService } from './mail.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'TEST_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: [process.env.NATS_SERVER]
        }
      }
    ])
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
