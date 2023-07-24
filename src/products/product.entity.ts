import { Order } from 'src/order/order.entity';
import { Entity, Column, PrimaryGeneratedColumn,OneToMany } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  product_id: number;

  @Column()
  item_name: string;

  @Column()
  barcode: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @OneToMany(() => Order, order => order.product)
  public order: Order[];
}
