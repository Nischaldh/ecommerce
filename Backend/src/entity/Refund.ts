import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, JoinColumn, CreateDateColumn,
  UpdateDateColumn, Relation,
} from "typeorm";
import { Order } from "./Order.js";
import { User } from "./User.js";
import { Admin } from "./Admin.js";
import { RefundStatus } from "../types/global.types.js";


@Entity("refunds")
export class Refund {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid" })
  order_id!: string;

  @Column({ type: "uuid" })
  user_id!: string;

  @Column({ type: "uuid", nullable: true })
  admin_id!: string | null;

  @Column({
    type: "decimal", precision: 10, scale: 2,
    transformer: { to: (v: number) => v, from: (v: string) => parseFloat(v) },
  })
  amount!: number;

  @Column({
    type: "enum",
    enum: RefundStatus,
    default: RefundStatus.REQUESTED,
  })
  status!: RefundStatus;

  @Column({ type: "text" })
  reason!: string;

  @Column({ type: "text", nullable: true })
  adminNotes!: string | null;

  @Column({ type: "text", nullable: true, name: "refund_reference" })
  refundReference!: string | null;

  @ManyToOne(() => Order)
  @JoinColumn({ name: "order_id" })
  order!: Relation<Order>;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user!: Relation<User>;

  @ManyToOne(() => Admin, { nullable: true })
  @JoinColumn({ name: "admin_id" })
  admin!: Relation<Admin> | null;

  @CreateDateColumn({ type: "timestamptz", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz", name: "updated_at" })
  updatedAt!: Date;
}