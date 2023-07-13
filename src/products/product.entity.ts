import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  item_name: string;

  @Column()
  barcode: string;

  @Column()
  price: number;
}
