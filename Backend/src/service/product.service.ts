import { AppDataSource } from "../config/data-source.js";
import { Product } from "../entity/Product.js";
import { ProductImage } from "../entity/ProductImage.js";
import { NotFoundError } from "../lib/erros.js";
import { mapProduct } from "../lib/utlis.js";
import { queryType } from "../types/global.types.js";
import {
  ICreateProduct,
  IProductResponse,
} from "../types/product.schema.js";
import { productValidation } from "../validations/product.validation.js";

const productRepository = AppDataSource.getRepository(Product);
const productImageRepository = AppDataSource.getRepository(ProductImage);
export const createProductService = async (
  productData: ICreateProduct,
): Promise<{ product: IProductResponse; success: boolean }> => {
  const { images, ...productField } = productData;

//creating product
  const product = productRepository.create(productField);

//   saving product
  const savedProduct = await productRepository.save(product);

//   creating and saving secondary images
  if (images && images.length > 0) {
    const imageEntities = images.map((img) =>
      productImageRepository.create({
        img_url: img.url,
        product_id: savedProduct.id,
      }),
    );

    await productImageRepository.save(imageEntities);
  }

//   response with product details and user name and id
  const fullProduct = await productRepository.findOne({
    where: { id: savedProduct.id },
    relations: ["images", "seller"],
    select: {
      id: true,
      name: true,
      price: true,
      description: true,
      category: true,
      primaryImage: true,
      createdAt: true,
      updatedAt: true,
      seller: {
        id: true,
        name: true,
      },
      images: {
        id: true,
        img_url: true,
      },
    },
  });
  if (!fullProduct) {
    throw new NotFoundError(
      "Product not found after creation, something went wrong.",
    );
  }
  return { product: mapProduct(fullProduct), success: true };
};


export const getProductsService = async (query: queryType): Promise<{ products: IProductResponse[]; total: number }> => {
  const { name, category, minPrice, maxPrice, page = 1, pageSize = 10 } = query;
  const skip = (page - 1) * pageSize;
    const qb = productRepository
    .createQueryBuilder("product")
    .leftJoinAndSelect("product.seller", "seller")
    .leftJoinAndSelect("product.images", "images")
    .where("product.deleted = :deleted", { deleted: false });

  if (name) qb.andWhere("product.name ILIKE :name", { name: `%${name}%` });
  if (category) qb.andWhere("product.category = :category", { category });
  if (minPrice) qb.andWhere("product.price >= :minPrice", { minPrice });
  if (maxPrice) qb.andWhere("product.price <= :maxPrice", { maxPrice });

  const total = await qb.getCount();


  const products = await qb
    .orderBy("product.createdAt", "DESC")
    .skip(skip)
    .take(pageSize)
    .getMany();

  return { products: products.map(mapProduct), total };


}

export const getAProductService = async (
  id: string,
): Promise<{ product: IProductResponse; success: boolean }> => {

  const product = await productRepository.findOne({
    where: { id, deleted: false },
    relations: ["images", "seller"],
  });

  if (!product) {
    throw new NotFoundError("Product not found");
  }

  return {
    product: mapProduct(product),
    success: true,
  };
};