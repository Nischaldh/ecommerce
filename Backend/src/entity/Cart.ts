import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Relation,
  OneToOne
} from "typeorm";

import { User } from "./User.js";
import { CartItem } from "./CartItem.js";


@Entity()
export class Cart {

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid" , name:"user_id"})
  user_id!: string;

  @OneToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user!: Relation<User>;

  @OneToMany(() => CartItem, item => item.cart)
  items!: Relation<CartItem[]>;

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