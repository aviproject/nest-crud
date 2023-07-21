import { Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { customerDto } from './customer.dto';
import { Order } from 'src/order/order.entity';

@Injectable()
export class CustomerService {
  constructor(
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
    console.log(data.customer_id,"data")
   
    let orderData;
    if(data.customer_id){
      const order = new Order();

      customerData.items.map((obj) => {
        order.customer_id = data.customer_id,
        order.product_id = obj.item_id,
        order.quantity = obj.quantity,
        order.total = obj.total

        orderData = this.orderRepositry.save(order);
        console.log(orderData.order_id,"orderData")
      })

    }

    return orderData
  }
}
