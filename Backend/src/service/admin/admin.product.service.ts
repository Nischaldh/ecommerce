import { AppDataSource } from "../../config/data-source.js";
import { Product } from "../../entity/Product.js";
import { NotFoundError } from "../../lib/erros.js";
import { NotificationType } from "../../types/global.types.js";
import { createNotificationService } from "../notification.service.js";

const productRepository = AppDataSource.getRepository(Product);

export const adminGetProductsService = async (query: {
  search?: string;
  category?: string;
  sellerId?: string;
  page?: number;
  pageSize?: number;
}) => {
  const { search, category, sellerId, page = 1, pageSize = 20 } = query;
  const skip = (page - 1) * pageSize;

  const qb = productRepository
    .createQueryBuilder("product")
    .leftJoinAndSelect("product.seller", "seller")
    .where("product.deleted = :deleted", { deleted: false })
    .orderBy("product.createdAt", "DESC")
    .skip(skip)
    .take(pageSize);

  if (search) {
    qb.andWhere("product.name ILIKE :search", { search: `%${search}%` });
  }
  if (category) qb.andWhere("product.category = :category", { category });
  if (sellerId) qb.andWhere("product.seller_id = :sellerId", { sellerId });

  const [products, total] = await qb.getManyAndCount();
  return { products, total };
};

export const adminDeleteProductService = async ({productId, note}: { productId: string, note: string }) => {
  const product = await productRepository.findOne({
    where: { id: productId },
  });
  if (!product) throw new NotFoundError("Product not found");
  product.deleted = true;
  await productRepository.save(product);
  await createNotificationService({
    userId: product.seller_id,
    type: NotificationType.PRODUCT_DELETED,
    title:`Your product ${product.name} has been deleted`,
    message: note,
  })
  return { success: true };
};