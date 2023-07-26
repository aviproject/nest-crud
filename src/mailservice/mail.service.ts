import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEMail(){
    console.log("in service")
   await this.mailerService.sendMail({
      to : 'aviproj2020@gmail.com',
      subject : 'Order Created',
      html: "<h5>Order created succefully</h5>",
    });

  }
}
