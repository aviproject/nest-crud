import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { customerDto } from './customer.dto';

@Controller('/createorder')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async createCustomer(@Body() message: customerDto){
    try{
      let orderData = await this.customerService.create(message);
      if(orderData){
        const response = {
          statusCode: 200,
          message: "Order created sucessfully",
          data: orderData,
        };
        return response
      }
    }catch(error){
      throw new NotFoundException(error)
    }
  }
}
