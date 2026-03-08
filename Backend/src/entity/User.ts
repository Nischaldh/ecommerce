import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";
import { userRole, userStatus } from "../types/global.types.js";

@Entity()
export class Users {
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
  otp!: string;

  @Column({
    type: "timestamp",
    name: "otp_expires",
    nullable: true,
  })
  otpExpires!: Date;

  @CreateDateColumn({ type: "timestamptz", name: "created_at" })
  createdAt!: Date;
  @CreateDateColumn({ type: "timestamptz", name: "updated_at" })
  updated!: Date;
}
