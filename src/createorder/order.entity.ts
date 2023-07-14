import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  order_id: number;

  @Column()
  customer_name: string;

  @Column()
  purchase_date: Date;

  @Column()
  subtotal: number;

  @Column()
  discount: number;

  @Column()
  final_price:number;
}
