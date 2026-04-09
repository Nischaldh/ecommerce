import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, JoinColumn, CreateDateColumn,
  UpdateDateColumn, Relation,
} from "typeorm";
import { User } from "./User.js";

import { PayoutMethod, PayoutStatus } from "../types/global.types.js";
import { Admin } from "./Admin.js";



@Entity("payouts")
export class Payout {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid" })
  seller_id!: string;

  @Column({ type: "uuid", nullable: true })
  admin_id!: string | null;    

  @Column({
    type: "decimal", precision: 12, scale: 2,
    transformer: { to: (v: number) => v, from: (v: string) => parseFloat(v) },
  })
  amount!: number;

  @Column({ type: "enum", enum: PayoutStatus, default: PayoutStatus.PENDING })
  status!: PayoutStatus;

  @Column({ type: "enum", enum: PayoutMethod })
  method!: PayoutMethod;

  @Column({ type: "text", nullable: true, name: "payout_reference" })
  payoutReference!: string | null;  

  @Column({ type: "text", nullable: true })
  notes!: string | null;

  @ManyToOne(() => User)
  @JoinColumn({ name: "seller_id" })
  seller!: Relation<User>;

  @ManyToOne(() => Admin, { nullable: true })
  @JoinColumn({ name: "admin_id" })
  admin!: Relation<Admin> | null;

  @CreateDateColumn({ type: "timestamp", name: "created_at", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz", name: "updated_at", default: () => "CURRENT_TIMESTAMP" })
  updatedAt!: Date;
}