import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  
  Relation,
  
  UpdateDateColumn,
} from "typeorm";
import   { User } from "./User.js";
import  { ProductImage } from "./ProductImage.js";

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text" })
  name!: string;

  @Column({ type: "decimal" })
  price!: number;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "text" })
  category!: string;

  @Column({ type: "boolean", default: false })
  deleted!: boolean;

  @Column({ type: "text", name: "primary_image" })
  primaryImage!: string;


  @OneToMany(() => ProductImage, (img) => img.product)
  images!: Relation<ProductImage[]>;

  @Column({ type: "uuid" })
  seller_id!: string;

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn({ name: "seller_id" })
  seller!: Relation<User>;

  @CreateDateColumn({ type: "timestamp",name: "created_at", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp",name: "updated_at", default: () => "CURRENT_TIMESTAMP" })
  updatedAt!: Date;
}
