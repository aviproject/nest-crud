import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';


@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  getAllProdcuts() {
    return this.productRepository.find();
  }

  async getProductById(id: number): Promise<Product> {
    return this.productRepository.findOne({
      where: { id: id },
    });
  }
}
