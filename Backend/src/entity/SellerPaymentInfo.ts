import {
  Entity, PrimaryGeneratedColumn, Column,
  OneToOne, JoinColumn, CreateDateColumn,
  UpdateDateColumn, Relation,
} from "typeorm";
import { User } from "./User.js";

export enum PayoutPreference {
  KHALTI = "KHALTI",
  BANK = "BANK",
}

@Entity("seller_payment_info")
export class SellerPaymentInfo {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid", unique: true })
  seller_id!: string;

  @OneToOne(() => User)
  @JoinColumn({ name: "seller_id" })
  seller!: Relation<User>;

  @Column({
    type: "enum",
    enum: PayoutPreference,
    default: PayoutPreference.KHALTI,
  })
  payoutPreference!: PayoutPreference;


  @Column({ type: "text", nullable: true, name: "khalti_id" })
  khaltiId!: string | null; 

  @Column({ type: "text", nullable: true, name: "khalti_name" })
  khaltiName!: string | null;

  @Column({ type: "boolean", default: false, name: "is_verified" })
  isVerified!: boolean; 

  @CreateDateColumn({ type: "timestamptz", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz", name: "updated_at" })
  updatedAt!: Date;
}