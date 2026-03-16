import { CartItem } from "../entity/CartItem.js";
import { Product } from "../entity/Product.js";
import { ICartItemResponse } from "../types/cart.schema.js";
import { IProductResponse } from "../types/product.schema.js";

export const mapProduct = (product: Product): IProductResponse=> {
   return {
    id: product.id,
    name: product.name,
    price: Number(product.price),
    description: product.description,
    category: product.category,
    stock: product.stock,
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


export const mapCartItem = (item: CartItem): ICartItemResponse => ({
  id: item.id,
  cart_id: item.cart_id,
  quantity: item.quantity,
  createdAt: item.createdAt,
  updatedAt: item.updatedAt,
  product: {
    id: item.product.id,
    name: item.product.name,
    price: Number(item.product.price),
    primaryImage: item.product.primaryImage,
  },
});
