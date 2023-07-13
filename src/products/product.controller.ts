import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAllProducts(): any {
    return this.productService.getAllProdcuts();
  }

  @Get('product/:id')
  async getProductById(@Param('id') id: number) {
    const product = await this.productService.getProductById(id);
    return product;
  }
}
