import { AppDataSource } from "../config/data-source.js";
import { Product } from "../entity/Product.js";
import { ProductImage } from "../entity/ProductImage.js";
import { ForbiddenError, NotFoundError } from "../lib/erros.js";
import { mapProduct } from "../lib/utlis.js";
import { queryType, SortBy } from "../types/global.types.js";
import {
  ICreateProduct,
  IProductResponse,
  IUpdateProduct,
} from "../types/product.schema.js";

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


  const fullProduct = await productRepository.findOne({
    where: { id: savedProduct.id },
    relations: ["images", "seller"],
    select: {
      id: true,
      name: true,
      price: true,
      description: true,
      category: true,
      stock: true,
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

export const getProductsService = async (
  query: queryType,
): Promise<{ products: IProductResponse[]; total: number }> => {
  const {
    name,
    category,
    minPrice,
    maxPrice,
    page = 1,
    pageSize = 10,
    minRating,
    sort,
  } = query;
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
  if (minRating)
    qb.andWhere("product.averageRating >= :minRating", { minRating });

  switch (sort) {
    case SortBy.CREATED_AT_ASC:
      qb.orderBy("product.createdAt", "ASC");
      break;

    case SortBy.CREATED_AT_DESC:
      qb.orderBy("product.createdAt", "DESC");
      break;

    case SortBy.PRICE_ASC:
      qb.orderBy("product.price", "ASC");
      break;

    case SortBy.PRICE_DESC:
      qb.orderBy("product.price", "DESC");
      break;

    case SortBy.RATING:
      qb.orderBy("product.averageRating", "DESC");
      break;

    default:
      qb.orderBy("product.createdAt", "DESC"); 
  }


  const total = await qb.getCount();
  const products = await qb.skip(skip).take(pageSize).getMany();

  return { products: products.map(mapProduct), total };
};

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

export const getSellerProduct = async (
  productId: string,
  sellerId: string,
): Promise<Product> => {
  const product = await productRepository.findOne({
    where: { id: productId, seller_id: sellerId, deleted: false },
    relations: ["images", "seller"],
  });

  if (!product) {
    throw new NotFoundError("Product not found");
  }

  return product;
};

export const editProductService = async (
  productId: string,
  sellerId: string,
  updatedData: IUpdateProduct,
): Promise<{ product: IProductResponse; success: boolean }> => {
  const { images, ...productFields } = updatedData;

  const product = await getSellerProduct(productId, sellerId);

  Object.assign(product, productFields);

  const savedProduct = await productRepository.save(product);

  if (images) {
    await productImageRepository.delete({
      product_id: savedProduct.id,
    });

    const imageEntities = images.map((img) =>
      productImageRepository.create({
        img_url: img.url,
        product_id: savedProduct.id,
      }),
    );

    await productImageRepository.save(imageEntities);
  }

  const fullProduct = await productRepository.findOne({
    where: { id: savedProduct.id },
    relations: ["images", "seller"],
  });

  if (!fullProduct) {
    throw new NotFoundError("Product not found after update");
  }

  return {
    product: mapProduct(fullProduct),
    success: true,
  };
};

export const deleteProductService = async (
  productId: string,
  sellerId: string,
): Promise<{ success: boolean }> => {
  const product = await getSellerProduct(productId, sellerId);

  product.deleted = true;
  await productRepository.save(product);

  return { success: true };
};
