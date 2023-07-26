import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { customerDto } from './customer.dto';

@Controller('/createorder')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async createCustomer(@Body() message: customerDto){
    console.log(message);
    try{
      await this.customerService.create(message);
      return "Customer created sucessfully"
    }catch(error){
      throw new NotFoundException(error)
    }
  }
}
