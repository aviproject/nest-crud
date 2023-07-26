import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Customer } from '../customer/customer.entity';
import { Product } from '../products/product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  order_id: number;
  
  @Column()
  quantity: number;
  
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @ManyToOne(() => Customer , customer => customer.order,{cascade: true})
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;
  
  @ManyToOne(() => Product, product => product.order,{cascade: true} )
  @JoinColumn({ name: 'product_id' })
  product: Product;
  
  @Column()
  public customer_id : number;

  @Column()
  public product_id:number;

}