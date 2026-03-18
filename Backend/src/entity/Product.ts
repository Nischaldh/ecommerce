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
import { User } from "./User.js";
import { ProductImage } from "./ProductImage.js";
import { Review } from "./Review.js";

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text" })
  name!: string;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  price!: number;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "text" })
  category!: string;

  @Column({ type: "int", default: 0 })
  stock!: number;

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

  @CreateDateColumn({
    type: "timestamp",
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: "timestamp",
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt!: Date;
  @OneToMany(() => Review, (review) => review.product)
  reviews!: Relation<Review[]>;

  @Column({
    type: "decimal",
    precision: 3,
    scale: 2,
    default: 0,
    name: "average_rating",
    transformer: {
      to: (v: number) => v,
      from: (v: string) => parseFloat(v),
    },
  })
  averageRating!: number;

  @Column({ type: "int", default: 0, name: "review_count" })
  reviewCount!: number;
}
