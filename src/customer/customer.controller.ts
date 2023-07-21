import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { customerDto } from './customer.dto';

@Controller('/createorder')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  createCustomer(@Body() message: customerDto){
    console.log(message);
    return this.customerService.create(message);
}
}
