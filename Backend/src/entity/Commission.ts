import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, JoinColumn, CreateDateColumn,
  UpdateDateColumn, Relation, OneToOne,
} from "typeorm";
import { OrderItem } from "./OrderItems.js";
import { Order } from "./Order.js";
import { User } from "./User.js";
import { CommissionStatus } from "../types/global.types.js";


@Entity("commissions")
export class Commission {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid" })
  order_item_id!: string;

  @Column({ type: "uuid" })
  order_id!: string;

  @Column({ type: "uuid" })
  seller_id!: string;

  @Column({
    type: "decimal", precision: 10, scale: 2,
    transformer: { to: (v: number) => v, from: (v: string) => parseFloat(v) },
    name: "item_amount",
  })
  itemAmount!: number;         // subtotal of the order item

  @Column({
    type: "decimal", precision: 5, scale: 4,
    transformer: { to: (v: number) => v, from: (v: string) => parseFloat(v) },
    name: "commission_rate",
  })
  commissionRate!: number;     

  @Column({
    type: "decimal", precision: 10, scale: 2,
    transformer: { to: (v: number) => v, from: (v: string) => parseFloat(v) },
    name: "commission_amount",
  })
  commissionAmount!: number;   // itemAmount * commissionRate

  @Column({
    type: "decimal", precision: 10, scale: 2,
    transformer: { to: (v: number) => v, from: (v: string) => parseFloat(v) },
    name: "seller_amount",
  })
  sellerAmount!: number;       // itemAmount - commissionAmount

  @Column({
    type: "enum",
    enum: CommissionStatus,
    default: CommissionStatus.PENDING,
  })
  status!: CommissionStatus;

  @OneToOne(() => OrderItem)
  @JoinColumn({ name: "order_item_id" })
  orderItem!: Relation<OrderItem>;

  @ManyToOne(() => Order)
  @JoinColumn({ name: "order_id" })
  order!: Relation<Order>;

  @ManyToOne(() => User)
  @JoinColumn({ name: "seller_id" })
  seller!: Relation<User>;

  @CreateDateColumn({ type: "timestamp", name: "created_at", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz", name: "updated_at", default: () => "CURRENT_TIMESTAMP" })
  updatedAt!: Date;
}