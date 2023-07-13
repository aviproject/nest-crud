import { Module } from '@nestjs/common';
import { ProductModule } from './products/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306, 
      username: 'root', 
      password: 'root', 
      database: 'Product_db', 
      entities: [Product],
      synchronize: true,
      retryAttempts:3,
      retryDelay:3000,
    }),
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
