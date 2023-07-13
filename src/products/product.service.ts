import { Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Like, Repository } from 'typeorm';


@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  getAllProdcuts(searchByItem?: string, searchByBarCode?: string) {
    return searchByItem || searchByBarCode
      ? this.productRepository.find({
          where: [{ item_name: Like(`%${searchByItem}%`) }, { barcode: Like(`%${searchByBarCode}%`)}],
        })
      : this.productRepository.find();
  }

  async getProductById(id: number): Promise<Product> {
    return this.productRepository.findOne({
      where: { id: id },
    });
  }
}
