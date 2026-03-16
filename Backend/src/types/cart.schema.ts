export interface IAddToCart {
  productId: string;
  quantity: number;
}

export interface IUpdateCartItem {
  quantity: number;
}

export interface ICartItemResponse {
  id: string;
  cart_id: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  product: {
    id: string;
    name: string;
    price: number;
    primaryImage: string;
  };
}

export interface ICartResponse {
  id: string;
  items: ICartItemResponse[];
  createdAt: Date;
  updatedAt: Date;
}
