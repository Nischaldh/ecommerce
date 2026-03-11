import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Relation,
} from "typeorm";
import   { Product } from "./Product.js";

@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text" })
  img_url!: string;

  @Column({ type: "uuid" })
  product_id!: string;

  @ManyToOne(() => Product, (product) => product.images,{onDelete:"CASCADE"})
  @JoinColumn({ name: "product_id" })
  product!: Relation<Product>;

  @CreateDateColumn({
    type: "timestamptz",
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt!: Date;
  @UpdateDateColumn({
    type: "timestamptz",
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  updated!: Date;
}
