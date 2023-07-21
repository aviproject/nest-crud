
export class customerDto{
    customer_name: string;
    purchase_date: string;
    subtotal: number;
    discount: number;
    final_price:number;
    items: Array<{ item_id: number, item_name: string, price: number,quantity: number, total: number}> = []
}