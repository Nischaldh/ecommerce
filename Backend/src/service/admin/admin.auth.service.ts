import { AppDataSource } from "../../config/data-source.js";
import { Admin } from "../../entity/Admin.js";
import { signAdminToken } from "../../lib/adminAuth.js";
import { comparePassword, hashPassword } from "../../lib/bcrypt.js";
import { AuthenticationError, BadRequestError, NotFoundError } from "../../lib/erros.js";
import { AdminRole } from "../../types/global.types.js";

const adminRepository = AppDataSource.getRepository(Admin);

export const createAdminService = async (data: {
  name: string;
  email: string;
  password: string;
  role?: AdminRole;
}): Promise<{ id: string; name: string; email: string; role: AdminRole }> => {
  const exists = await adminRepository.findOne({ where: { email: data.email } });
  if (exists) throw new BadRequestError("Email already in use");

  const hashed = await hashPassword(data.password);

  const admin = adminRepository.create({
    name: data.name,
    email: data.email,
    password: hashed,
    role: data.role ?? AdminRole.ADMIN,
    isActive: true,
  });

  const saved = await adminRepository.save(admin);

  return {
    id: saved.id,
    name: saved.name,
    email: saved.email,
    role: saved.role,
  };
};

export const loginAdminService = async (
  email: string,
  password: string,
): Promise<{ token: string; admin: { id: string; name: string; email: string; role: AdminRole } }> => {
  const admin = await adminRepository
    .createQueryBuilder("admin")
    .addSelect("admin.password")   
    .where("admin.email = :email", { email })
    .getOne();

  if (!admin) throw new AuthenticationError("Invalid credentials");
  if (!admin.isActive) throw new AuthenticationError("Account deactivated");

  const valid = await comparePassword(password, admin.password);
  if (!valid) throw new AuthenticationError("Invalid credentials");

  const token = signAdminToken({
    id: admin.id,
    email: admin.email,
    role: admin.role,
  });

  return {
    token,
    admin: {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  };
};

export const getMeAdminService = async (
  adminId: string,
): Promise<{ id: string; name: string; email: string; role: AdminRole }> => {
  const admin = await adminRepository.findOne({ where: { id: adminId } });
  if (!admin) throw new NotFoundError("Admin not found");

  return {
    id: admin.id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
  };
};

export const deactivateAdminService = async (
  targetId: string,
  requestingAdminId: string,
): Promise<void> => {
  if (targetId === requestingAdminId) {
    throw new BadRequestError("Cannot deactivate your own account");
  }

  const admin = await adminRepository.findOne({ where: { id: targetId } });
  if (!admin) throw new NotFoundError("Admin not found");

  admin.isActive = false;
  await adminRepository.save(admin);
};