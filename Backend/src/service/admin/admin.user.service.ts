import { AppDataSource } from "../../config/data-source.js";
import { User } from "../../entity/User.js";
import { Order } from "../../entity/Order.js";
import { BadRequestError, NotFoundError } from "../../lib/erros.js";
import { userRole, userStatus } from "../../types/global.types.js";

const userRepository = AppDataSource.getRepository(User);
const orderRepository = AppDataSource.getRepository(Order);

export const adminGetUsersService = async (query: {
  role?: userRole;
  search?: string;
  status?: userStatus;
  page?: number;
  pageSize?: number;
}): Promise<{ users: User[]; total: number }> => {
  const { role, search, status, page = 1, pageSize = 20 } = query;
  const skip = (page - 1) * pageSize;

  const qb = userRepository
    .createQueryBuilder("user")
    .select([
      "user.id",
      "user.name",
      "user.email",
      "user.role",
      "user.status",
      "user.profilePic",
      "user.createdAt",
    ])
    .orderBy("user.createdAt", "DESC")
    .skip(skip)
    .take(pageSize);

  if (role) {
    qb.andWhere("user.role = :role", { role });
  }
  if (status) {
    qb.andWhere("user.status = :status", { status });
  }
  if (search) {
    qb.andWhere(
      "(user.name ILIKE :search OR user.email ILIKE :search)",
      { search: `%${search}%` },
    );
  }

  const [users, total] = await qb.getManyAndCount();
  return { users, total };
};

export const adminGetUserByIdService = async (userId: string): Promise<{ user: User; stats: { totalOrders: number; totalSpent: number } }> => {
  const user = await userRepository.findOne({
    where: { id: userId },
    select: ["id", "name", "email", "role", "status", "profilePic", "createdAt"],
  });
  if (!user) throw new NotFoundError("User not found");

  const orderStats = await orderRepository
    .createQueryBuilder("order")
    .select("COUNT(order.id)", "totalOrders")
    .addSelect("SUM(order.total_amount)", "totalSpent")
    .where("order.user_id = :userId", { userId })
    .getRawOne();

  return {
    user,
    stats: {
      totalOrders: parseInt(orderStats?.totalOrders ?? "0"),
      totalSpent: parseFloat(orderStats?.totalSpent ?? "0"),
    },
  };
};

export const adminSuspendUserService = async (userId: string): Promise<{ success: true }> => {
  const user = await userRepository.findOne({ where: { id: userId } });
  if (!user) throw new NotFoundError("User not found");
  if (user.status === userStatus.SUSPENDED) {
    throw new BadRequestError("User is already suspended");
  }
  user.status = userStatus.SUSPENDED;
  await userRepository.save(user);
  return { success: true };
};

export const adminUnsuspendUserService = async (userId: string): Promise<{ success: true }> => {
  const user = await userRepository.findOne({ where: { id: userId } });
  if (!user) throw new NotFoundError("User not found");
  if (user.status !== userStatus.SUSPENDED) {
    throw new BadRequestError("User is not suspended");
  }
  user.status = userStatus.VERIFIED;
  await userRepository.save(user);
  return { success: true };
};

export const adminDeleteUserService = async (userId: string): Promise<{ success: true }> => {
  const user = await userRepository.findOne({ where: { id: userId } });
  if (!user) throw new NotFoundError("User not found");
  user.status = userStatus.DELETED;
  await userRepository.save(user);
  return { success: true };
};