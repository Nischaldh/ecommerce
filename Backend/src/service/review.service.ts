import { EntityManager } from "typeorm";
import { AppDataSource } from "../config/data-source.js";
import { OrderItem } from "../entity/OrderItems.js";
import { Product } from "../entity/Product.js";
import { Review } from "../entity/Review.js";
import { BadRequestError, ForbiddenError, NotFoundError } from "../lib/erros.js";
import { mapReview } from "../lib/utlis.js";
import { OrderItemStatus } from "../types/global.types.js";
import { ICreateReview, IReviewResponse, IUpdateReview } from "../types/review.schema.js";


/* 
Review service will include:

createReview: to create Review
editReview: to edit review
deleteReview: to delete reviews


steps:
1) check if the user has purchased the product:
 if(true) then allow review
 else throw forbidden error

2) to edit review: check if the review belongs to user same for deleting review

3) update rating and review count in products table
*/

// check if the user has purchased the product.
/*
steps:
orderItem has details about the product status: product_id , status, order_id to join with order table
order table has: userId 
query:
select * from
order_items oi inner join order o
on oi.order_id = o.id
(table will now have orderId, productId, buyer_Id and status)
where buyer_id, status = delivered or refunded , productid

*/
const verifyPurchase = async (
  manager: EntityManager,
  userId: string,
  productId: string,
): Promise<void> => {
  const qb = manager.getRepository(OrderItem).createQueryBuilder("oi");

  qb.innerJoin("oi.order", "o");
  qb.where("o.user_id = :userId", { userId });
  qb.andWhere("oi.product_id = :productId", { productId });
  qb.andWhere("oi.status IN (:...statuses)", {
    statuses: [OrderItemStatus.DELIVERED, OrderItemStatus.REFUNDED],
  });

  const purchased = await qb.getOne();

  if (!purchased) {
    throw new ForbiddenError("You can only review products you have received.");
  }
}

/*
Syncing productRating
counting avg and total count of a productId from product table
*/
const syncProductRating = async (
  manager: EntityManager,
  productId: string,
): Promise<void> => {
  const { avg, count } = await manager
    .getRepository(Review)
    .createQueryBuilder("r")
    .select("AVG(r.rating)", "avg")
    .addSelect("COUNT(*)", "count")
    .where("r.product_id = :productId", { productId })
    .getRawOne();

  await manager.getRepository(Product).update(productId, {
    averageRating: parseFloat(avg) || 0,
    reviewCount: parseInt(count) || 0,
  });
};

export const createReviewService = async (
  userId: string,
  productId: string,
  data: ICreateReview,
): Promise<{ review: IReviewResponse; success: boolean }> => {
  return await AppDataSource.transaction(async (manager) => {
    const productRepo = manager.getRepository(Product);
    const reviewRepo = manager.getRepository(Review);

    const product = await productRepo.findOne({
      where: { id: productId, deleted: false },
    });
    if (!product) throw new NotFoundError("Product not found");

    await verifyPurchase(manager, userId, productId);

    const existing = await reviewRepo.findOne({
      where: { user_id: userId, product_id: productId },
    });
    if (existing) {
      throw new BadRequestError("You have already reviewed this product");
    }

    const review = reviewRepo.create({
      user_id: userId,
      product_id: productId,
      rating: data.rating,
      comment: data.comment ?? null,
    });

    const saved = await reviewRepo.save(review);

    await syncProductRating(manager, productId);

    const full = await reviewRepo.findOneOrFail({
      where: { id: saved.id },
      relations: ["user"],
    });

    return { review: mapReview(full), success: true };
  });
};

export const updateReviewService = async (
  reviewId: string,
  userId: string,
  data: IUpdateReview,
): Promise<{ review: IReviewResponse }> => {
  return await AppDataSource.transaction(async (manager) => {
    const reviewRepo = manager.getRepository(Review);

    const review = await reviewRepo.findOne({
      where: { id: reviewId },
      relations: ["user"],
    });

    if (!review) throw new NotFoundError("Review not found");
    if (review.user_id !== userId) throw new ForbiddenError("Not your review");

    if (data.rating !== undefined) review.rating = data.rating;
    if (data.comment !== undefined) review.comment = data.comment;

    const saved = await reviewRepo.save(review);

    await syncProductRating(manager, review.product_id);

    return { review: mapReview(saved) };
  });
};

export const deleteReviewService = async (
  reviewId: string,
  userId: string,
): Promise<{ success: boolean }> => {
  return await AppDataSource.transaction(async (manager) => {
    const reviewRepo = manager.getRepository(Review);

    const review = await reviewRepo.findOne({
      where: { id: reviewId },
    });

    if (!review) throw new NotFoundError("Review not found");
    if (review.user_id !== userId) throw new ForbiddenError("Not your review");

    const productId = review.product_id;

    await reviewRepo.delete({ id: reviewId });

    await syncProductRating(manager, productId);

    return { success: true };
  });
};

export const getProductReviewsService = async (
  id: string,
): Promise<{ reviews: IReviewResponse[]; total: number }> => {
  const reviewRepository = AppDataSource.getRepository(Review);

  const [reviews, total] = await reviewRepository.findAndCount({
    where: { product_id:id },
    relations: ["user"],
    order: { createdAt: "DESC" },
  });

  return { reviews: reviews.map(mapReview), total };
};

export const getReviewService = async (
  reviewId: string,
): Promise<{ review: IReviewResponse }> => {
  const reviewRepository = AppDataSource.getRepository(Review);

  const review = await reviewRepository.findOne({
    where: { id: reviewId },
    relations: ["user"],
  });

  if (!review) throw new NotFoundError("Review not found");

  return { review: mapReview(review) };
};

export const getUserReviewsService = async (
  userId: string,
): Promise<{ reviews: IReviewResponse[]; total: number }> => {
  const reviewRepository = AppDataSource.getRepository(Review);

  const [reviews, total] = await reviewRepository.findAndCount({
    where: { user_id: userId },
    relations: ["user"],
    order: { createdAt: "DESC" },
  });

  return { reviews: reviews.map(mapReview), total };
};
