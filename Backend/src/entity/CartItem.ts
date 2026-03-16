import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Relation
} from "typeorm";

import { Cart } from "./Cart.js";
import { Product } from "./Product.js";

@Entity()
export class CartItem {

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid" })
  cart_id!: string;

  @Column({ type: "uuid" })
  product_id!: string;

  @Column({ type: "int" })
  quantity!: number;

  @ManyToOne(() => Cart, cart => cart.items)
  @JoinColumn({ name: "cart_id" })
  cart!: Relation<Cart>;

  @ManyToOne(() => Product)
  @JoinColumn({ name: "product_id" })
  product!: Relation<Product>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}