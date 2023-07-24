import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /**
   * @function getAllProducts
   * @description function fetch searched data by itemName or Barcode.
   * @param params 
   * @returns 
   */
  @Get()
  getAllProducts(@Query() params: {item:string,barcode:string}): any {
    return this.productService.getAllProdcuts(params.item,params.barcode);
  }

  /**
   * @function getProductById
   * @description function returns product by ID.
   * @param id 
   * @returns 
   */
  @Get(':id')
  async getProductById(@Param('id') id: number) {
    const product = await this.productService.getProductById(id);
    if(!product) throw new NotFoundException(`Product with ID ${id} not found`);
    return product;
  }
}
