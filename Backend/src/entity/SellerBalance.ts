import {
  Entity, PrimaryGeneratedColumn, Column,
  OneToOne, JoinColumn, CreateDateColumn,
  UpdateDateColumn, Relation,
} from "typeorm";
import { User } from "./User.js";

@Entity("seller_balances")
export class SellerBalance {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid", unique: true })
  seller_id!: string;

 
  @Column({
    type: "decimal", precision: 12, scale: 2, default: 0,
    transformer: { to: (v: number) => v, from: (v: string) => parseFloat(v) },
    name: "pending_amount",
  })
  pendingAmount!: number;

 
  @Column({
    type: "decimal", precision: 12, scale: 2, default: 0,
    transformer: { to: (v: number) => v, from: (v: string) => parseFloat(v) },
    name: "available_amount",
  })
  availableAmount!: number;


  @Column({
    type: "decimal", precision: 12, scale: 2, default: 0,
    transformer: { to: (v: number) => v, from: (v: string) => parseFloat(v) },
    name: "total_paid_out",
  })
  totalPaidOut!: number;

  @OneToOne(() => User)
  @JoinColumn({ name: "seller_id" })
  seller!: Relation<User>;

  @CreateDateColumn({ type: "timestamp", name: "created_at", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz", name: "updated_at", default: () => "CURRENT_TIMESTAMP" })
  updatedAt!: Date;
}