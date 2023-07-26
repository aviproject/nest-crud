import { Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller()
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get()
  public async createMail(){
    try{
        await this.mailService.sendEMail();
        return "Email send sucessfully"
    }catch(error){
        console.log(error,"Error")
        throw new NotFoundException(error)
    }
  }
}
