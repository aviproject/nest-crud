import { Inject, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { customerDto, itemDto } from './customer.dto';
import { Order } from 'src/order/order.entity';
import {MailService} from 'src/mailservice/mail.service'

@Injectable()
export class CustomerService {
  constructor(
    @Inject(MailService)
    private readonly mailService: MailService,

    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,

    @InjectRepository(Order)
    private orderRepositry : Repository<Order>
  ) {}

  async create(customerData: customerDto): Promise<any>
   {
    const customer = new Customer();

    customer.customer_name = customerData.customer_name;
    customer.purchase_date = customerData.purchase_date;
    customer.subtotal = customerData.subtotal;
    customer.discount = customerData.discount;
    customer.final_price = customerData.final_price;

    let data = await this.customerRepository.save(customer);
   
    if(!!data.customer_id){

      let orderData = customerData.items.map((obj: itemDto) => ({
        customer_id  : data.customer_id,
        product_id  : obj.item_id,
        quantity :  obj.quantity,
        total : obj.total
      }))
      let insertedData = await this.orderRepositry.save(orderData);
      
      if(insertedData) this.mailService.sendEMail();
      
      return insertedData
    }
  }
}
