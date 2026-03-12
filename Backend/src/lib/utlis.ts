import { Product } from "../entity/Product.js";
import { IProductResponse } from "../types/product.schema.js";

export const mapProduct = (product: Product): IProductResponse=> {
   return {
    id: product.id,
    name: product.name,
    price: Number(product.price),
    description: product.description,
    category: product.category,
    primaryImage: product.primaryImage,
    seller: {
      id: product.seller.id,
      name: product.seller.name,
    },
    images: product.images.map((img) => ({
      id: img.id,
      url: img.img_url,
    })),
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };

};
