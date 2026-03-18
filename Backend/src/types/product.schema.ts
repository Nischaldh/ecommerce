import { IUser } from "./user.schema.js";

type ProductImageInput = {
  url: string;
};


export interface ICreateProduct {
  name: string;
  price: number;
  description: string;
  category: string;
  stock:number;
  primaryImage: string;
  images: ProductImageInput[];
  seller_id: string;
}

export interface IProduct extends ICreateProduct {
  id: string;
}

export interface IExtendedProduct extends IProduct {
  seller?: IUser;
  createdAt: Date;
  updatedAt: Date;
}

type ProductImageResponse =ProductImageInput &{
    id:string;
}

export interface IProductResponse {
  id: string;
  name: string;
  price: number;       
  description: string;
  category: string;
  stock:number;
  primaryImage: string;
  images: ProductImageResponse[];
  averageRating: number; 
  reviewCount: number; 
  seller: {
    id: string;
    name: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IUpdateProduct {
  name?: string;
  price?: number;
  description?: string;
  category?: string;
  stock?:number;
  primaryImage?: string;
  images?: {
    url: string;
  }[];
}