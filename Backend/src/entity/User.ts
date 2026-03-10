import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn,
  Relation,
} from "typeorm";
import { userRole, userStatus } from "../types/global.types.js";
import  { Product } from "./Product.js";

@Entity("users")
export class User{
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text", nullable: false })
  name!: string;

  @Column({ type: "text", unique: true, nullable: false })
  email!: string;

  @Column({ type: "text", select: false, nullable: false })
  password!: string;

  @Column({ type: "enum", enum: userRole, default: userRole.SELLER })
  role!: userRole;

  @Column({ type: "enum", enum: userStatus, default: userStatus.NOT_VERIFIED })
  status!: userStatus;

  @Column({ type: "text", nullable: true, name: "profile_pic" })
  profilePic!: string;

  @Column({ nullable: true, type: "text" })
  otp!: string|null;

  @Column({
    type: "timestamp",
    name: "otp_expires",
    nullable: true,
  })
  otpExpires!: Date|null;

  // relation with product table
  @OneToMany(()=>Product,(product)=>product.seller)
  products!: Relation<Product[]>;

  @CreateDateColumn({ type: "timestamptz", name: "created_at", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;
  @UpdateDateColumn({ type: "timestamptz", name: "updated_at",default: () => "CURRENT_TIMESTAMP" })
  updatedAt!: Date;
}
