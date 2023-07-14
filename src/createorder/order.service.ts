import { Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { Product } from './product.entity';
import { Like, Repository } from 'typeorm';


@Injectable()
export class OrderService {
  constructor(
    // @InjectRepository(Product)
    // private productRepository: Repository<Product>,
  ) {}

}
