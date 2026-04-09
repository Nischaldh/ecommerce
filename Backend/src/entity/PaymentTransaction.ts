import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Relation,
} from "typeorm";
import { Order } from "./Order.js";
import { User } from "./User.js";
import { PaymentMethod, TransactionStatus } from "../types/global.types.js";

@Entity("payment_transactions")
export class PaymentTransaction {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid" })
  order_id!: string;

  @Column({ type: "uuid" })
  user_id!: string;

  @Column({ type: "enum", enum: PaymentMethod })
  method!: PaymentMethod;

  @Column({
    type: "enum",
    enum: TransactionStatus,
    default: TransactionStatus.INITIATED,
  })
  status!: TransactionStatus;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    transformer: { to: (v: number) => v, from: (v: string) => parseFloat(v) },
  })
  amount!: number;

  // Khalti's pidx (payment identifier) returned when initiating
  @Column({ type: "text", nullable: true })
  pidx!: string | null;

  // Khalti's transaction ID returned after verification
  @Column({ type: "text", nullable: true, name: "transaction_id" })
  transactionId!: string | null;

  // raw Khalti response stored for audit
  @Column({ type: "jsonb", nullable: true, name: "gateway_response" })
  gatewayResponse!: Record<string, any> | null;

  @Column({
    type: "timestamptz",
    nullable: true,
    name: "refund_eligible_until",
  })
  refundEligibleUntil!: Date | null;

  @ManyToOne(() => Order)
  @JoinColumn({ name: "order_id" })
  order!: Relation<Order>;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user!: Relation<User>;

  @CreateDateColumn({
    type: "timestamp",
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: "timestamptz",
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt!: Date;
}
