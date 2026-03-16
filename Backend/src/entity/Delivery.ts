import {
  Entity, PrimaryGeneratedColumn, Column,
  OneToOne, JoinColumn,
  CreateDateColumn, UpdateDateColumn, Relation,
} from "typeorm";

import { DeliveryStatus } from "../types/global.types.js";
import { OrderItem } from "./OrderItems.js";


@Entity("deliveries")
export class Delivery {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid" })
  order_item_id!: string;

  @OneToOne(() => OrderItem, (item) => item.delivery)
  @JoinColumn({ name: "order_item_id" })
  orderItem!: Relation<OrderItem>;

  @Column({ type: "enum", enum: DeliveryStatus, default: DeliveryStatus.PENDING })
  status!: DeliveryStatus;

  @Column({ type: "text", nullable: true })
  trackingNumber!: string | null;

  @Column({ type: "text", nullable: true })
  carrier!: string | null;

  @Column({ type: "timestamptz", nullable: true })
  estimatedDelivery!: Date | null;

  @Column({ type: "timestamptz", nullable: true })
  deliveredAt!: Date | null;

  @Column({ type: "text", nullable: true })
  notes!: string | null;

  @CreateDateColumn({ type: "timestamptz", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz", name: "updated_at" })
  updatedAt!: Date;
}
