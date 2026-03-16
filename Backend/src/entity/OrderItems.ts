import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, OneToOne, JoinColumn,
  CreateDateColumn, UpdateDateColumn, Relation,
} from "typeorm";
import { Order } from "./Order.js";
import { Product } from "./Product.js";
import { User } from "./User.js";
import { OrderItemStatus } from "../types/global.types.js";
import { Delivery } from "./Delivery.js";

@Entity("order_items")
export class OrderItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid" })
  order_id!: string;

  @Column({ type: "uuid" })
  product_id!: string;

  @Column({ type: "uuid" })
  seller_id!: string;

  @Column({ type: "text" })
  productName!: string;

  @Column({
    type: "decimal", precision: 10, scale: 2,
    transformer: {
      to: (v: number) => v,
      from: (v: string) => parseFloat(v),
    },
  })
  priceAtPurchase!: number;

  @Column({ type: "int" })
  quantity!: number;

  @Column({
    type: "decimal", precision: 10, scale: 2,
    transformer: {
      to: (v: number) => v,
      from: (v: string) => parseFloat(v),
    },
  })
  subtotal!: number;

  @Column({ type: "enum", enum: OrderItemStatus, default: OrderItemStatus.PENDING })
  status!: OrderItemStatus;

  @ManyToOne(() => Order, (order) => order.items)
  @JoinColumn({ name: "order_id" })
  order!: Relation<Order>;

  @ManyToOne(() => Product)
  @JoinColumn({ name: "product_id" })
  product!: Relation<Product>;

  @ManyToOne(() => User)
  @JoinColumn({ name: "seller_id" })
  seller!: Relation<User>;

  @OneToOne(() => Delivery, (delivery) => delivery.orderItem, { nullable: true, cascade: true })
  delivery!: Relation<Delivery> | null;

  @CreateDateColumn({ type: "timestamptz", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz", name: "updated_at" })
  updatedAt!: Date;
}