import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiResponseDTO, ProductParams } from './product.dto';

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
  async getAllProducts(@Query() params: ProductParams){
    try{
      let data = await this.productService.getAllProdcuts(params.item,params.barcode);
        if(data.length){
          const response: ApiResponseDTO = {
            statusCode: 200,
            message: "Product fetch successfully",
            data: data,
          };
          return response
        }else{
          const response: ApiResponseDTO = {
            statusCode: 200,
            message: 'Product Not Found!',
            data: data,
          };
          return response
        }
    }catch(error){
      throw new NotFoundException(error)
    }
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
