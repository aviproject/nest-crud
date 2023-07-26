
import { Order } from 'src/order/order.entity';
import { Product } from 'src/products/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, JoinColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  customer_id: number;

  @Column()
  customer_name: string;

  @Column()
  purchase_date: string;

  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;

  @Column('decimal', { precision: 10, scale: 2 })
  discount: number;

  @Column('decimal', { precision: 10, scale: 2 })
  final_price:number;

  @OneToMany(() => Order, order => order.customer)
  public order: Order[];
}
