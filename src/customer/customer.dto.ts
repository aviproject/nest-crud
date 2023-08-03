export class customerDto {
  customer_name: string;
  purchase_date: string;
  subtotal: number;
  discount: number;
  final_price: number;
  items: Array<{
    product_id: number;
    item_name: string;
    price: number;
    quantity: number;
    total: number;
  }> = [];
}

export class itemDto {
  product_id: number;
  item_name: string;
  price: number;
  quantity: number;
  total: number;
}
