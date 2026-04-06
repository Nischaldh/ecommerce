import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, JoinColumn, CreateDateColumn, Relation,
} from "typeorm";
import { User } from "./User.js";
import { NotificationType } from "../types/global.types.js";

@Entity("notifications")
export class Notification {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid" })
  user_id!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user!: Relation<User>;

  @Column({ type: "enum", enum: NotificationType })
  type!: NotificationType;

  @Column({ type: "text" })
  title!: string;

  @Column({ type: "text" })
  message!: string;

  @Column({ type: "uuid", nullable: true })
  order_id!: string | null;

  @Column({ type: "boolean", default: false })
  isRead!: boolean;

  @CreateDateColumn({ type: "timestamptz", name: "created_at" })
  createdAt!: Date;
}