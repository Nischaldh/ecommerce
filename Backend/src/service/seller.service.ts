import { AppDataSource } from "../config/data-source.js";
import { Product } from "../entity/Product.js";
import { User } from "../entity/User.js";
import { NotFoundError } from "../lib/erros.js";
import { mapProduct } from "../lib/utlis.js";
import { SortBy, userRole } from "../types/global.types.js";
import { IProductResponse } from "../types/product.schema.js";
import { ISellerDetailResponse, ISellerResponse } from "../types/user.schema.js";


const userRepository = AppDataSource.getRepository(User);
const productRepository = AppDataSource.getRepository(Product);

export const getSellersService = async (query: {
  name?: string;
  page?: number;
  pageSize?: number;
}): Promise<{ sellers: ISellerResponse[]; total: number }> => {
  const { name, page = 1, pageSize = 12 } = query;
  const skip = (page - 1) * pageSize;

  const qb = userRepository
    .createQueryBuilder("user")
    .where("user.role = :role", { role: userRole.SELLER });

  if (name) {
    qb.andWhere("user.name ILIKE :name", { name: `%${name}%` });
  }

  const total = await qb.getCount();

  const sellers = await qb
    .select(["user.id", "user.name", "user.profilePic", "user.createdAt"])
    .orderBy("user.createdAt", "DESC")
    .skip(skip)
    .take(pageSize)
    .getMany();

  return {
    sellers: sellers.map((s) => ({
      id: s.id,
      name: s.name,
      profilePic: s.profilePic,
      createdAt: s.createdAt,
    })),
    total,
  };
};

export const getSellerByIdService = async (
  sellerId: string,
): Promise<{ seller: ISellerDetailResponse }> => {
  const seller = await userRepository.findOne({
    where: { id: sellerId, role: userRole.SELLER },
    select: ["id", "name", "profilePic", "createdAt"],
  });

  if (!seller) throw new NotFoundError("Seller not found");

  // get total product count and average rating for this seller
  const stats = await productRepository
    .createQueryBuilder("product")
    .select("COUNT(product.id)", "totalProducts")
    .addSelect("AVG(product.averageRating)", "averageRating")
    .where("product.seller_id = :sellerId", { sellerId })
    .andWhere("product.deleted = :deleted", { deleted: false })
    .getRawOne();

  return {
    seller: {
      id: seller.id,
      name: seller.name,
      profilePic: seller.profilePic,
      createdAt: seller.createdAt,
      totalProducts: parseInt(stats.totalProducts) || 0,
      averageRating: parseFloat(stats.averageRating) || 0,
    },
  };
};

export const getSellerProductsService = async (
  sellerId: string,
  query: {
    name?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
    minRating?: number;
    page?: number;
    pageSize?: number;
  },
): Promise<{ products: IProductResponse[]; total: number }> => {
  const { name, minPrice, maxPrice, sort, minRating, page = 1, pageSize = 10 } = query;
  const skip = (page - 1) * pageSize;

  // verify seller exists
  const seller = await userRepository.findOne({
    where: { id: sellerId, role: userRole.SELLER },
  });
  if (!seller) throw new NotFoundError("Seller not found");

  const qb = productRepository
    .createQueryBuilder("product")
    .leftJoinAndSelect("product.seller", "seller")
    .leftJoinAndSelect("product.images", "images")
    .where("product.seller_id = :sellerId", { sellerId })
    .andWhere("product.deleted = :deleted", { deleted: false });

  if (name) qb.andWhere("product.name ILIKE :name", { name: `%${name}%` });
  if (minPrice) qb.andWhere("product.price >= :minPrice", { minPrice });
  if (maxPrice) qb.andWhere("product.price <= :maxPrice", { maxPrice });
  if (minRating) qb.andWhere("product.averageRating >= :minRating", { minRating });

  switch (sort) {
    case SortBy.PRICE_ASC:
      qb.orderBy("product.price", "ASC");
      break;
    case SortBy.PRICE_DESC:
      qb.orderBy("product.price", "DESC");
      break;
    case SortBy.RATING:
      qb.orderBy("product.averageRating", "DESC");
      break;
    case SortBy.CREATED_AT_ASC:
      qb.orderBy("product.createdAt", "ASC");
      break;
    default:
      qb.orderBy("product.createdAt", "DESC");
  }

  const total = await qb.getCount();
  const products = await qb.skip(skip).take(pageSize).getMany();

  return { products: products.map(mapProduct), total };
};