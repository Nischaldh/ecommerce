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
import { User } from "./User.js";

@Entity("user_addresses")
export class UserAddress {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid" })
  user_id!: string;

  @ManyToOne(() => User, (user) => user.addresses)
  @JoinColumn({ name: "user_id" })
  user!: Relation<User>;

  @Column({ type: "text" , name:"full_name"})
  fullName!: string;

  @Column({ type: "text" })
  phone!: string;

  @Column({ type: "text", name:"address_line1" })
  addressLine1!: string;

  @Column({ type: "text", nullable: true, name:"address_line2" })
  addressLine2!: string | null;

  @Column({ type: "text" })
  city!: string;

  @Column({ type: "text" })
  state!: string;

  @Column({ type: "text" , name:"postal_code"})
  postalCode!: string;

  @Column({ type: "text" })
  country!: string;

  @Column({ type: "boolean", default: false , name:"is_default"})
  isDefault!: boolean;

  @CreateDateColumn({ type: "timestamptz", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz", name: "updated_at" })
  updatedAt!: Date;
}
