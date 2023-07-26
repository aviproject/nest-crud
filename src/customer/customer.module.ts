import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';
import { Order } from 'src/order/order.entity';
import { MailModule } from 'src/mailservice/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([Customer,Order]),MailModule],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
