export class ApiResponseDTO {
    statusCode: number;
    message: string;
    data: any; // You can use a specific type here that matches the response data you want to send
  }


  export class ProductParams{
    item?:string;
    barcode?:string;
}