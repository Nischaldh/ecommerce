import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, OneToMany, JoinColumn,
  CreateDateColumn, UpdateDateColumn, Relation,
} from "typeorm";
import { User } from "./User.js";

import { OrderStatus, PaymentStatus } from "../types/global.types.js";
import { OrderItem } from "./OrderItems.js";


@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid" })
  user_id!: string;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: "user_id" })
  user!: Relation<User>;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items!: Relation<OrderItem[]>;

  @Column({
    type: "decimal", precision: 10, scale: 2,
    transformer: {
      to: (v: number) => v,
      from: (v: string) => parseFloat(v),
    },
  })
  totalAmount!: number;

  @Column({ type: "enum", enum: OrderStatus, default: OrderStatus.PENDING })
  status!: OrderStatus;

  @Column({ type: "enum", enum: PaymentStatus, default: PaymentStatus.UNPAID })
  paymentStatus!: PaymentStatus;

  @Column({ type: "jsonb" })
  shippingAddress!: {
    addressId?: string;
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string | null;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };

  @Column({ type: "text", nullable: true })
  paymentReference!: string | null;

  @CreateDateColumn({ type: "timestamptz", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz", name: "updated_at" })
  updatedAt!: Date;
}