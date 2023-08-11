import { Module } from '@nestjs/common';
import { ProductModule } from './products/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/product.entity';
import { CustomerModule } from './customer/customer.module';
import { Customer } from './customer/customer.entity';
import { Order } from './order/order.entity';
import { OrderModule } from './order/order.module';
import { MailModule } from './mailservice/mail.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306, 
      username: 'root', 
      password: 'root', 
      database: 'Product_db', 
      entities: [Product,Customer,Order,User],
      synchronize: true,
      retryAttempts:3,
      retryDelay:3000,
    }),
    ProductModule,
    CustomerModule,
    OrderModule,
    MailModule,
    AuthModule,
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
