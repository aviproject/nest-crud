import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
