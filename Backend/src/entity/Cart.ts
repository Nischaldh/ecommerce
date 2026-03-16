import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Relation
} from "typeorm";

import { User } from "./User.js";
import { CartItem } from "./CartItem.js";


@Entity()
export class Cart {

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid" })
  user_id!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user!: Relation<User>;

  @OneToMany(() => CartItem, item => item.cart)
  items!: Relation<CartItem[]>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}