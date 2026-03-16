// service/address.service.ts
import { AppDataSource } from "../config/data-source.js";
import { UserAddress } from "../entity/UserAddresses.js";

import { NotFoundError } from "../lib/erros.js";
import { mapAddress } from "../lib/utlis.js";
import {
  IAddressResponse,
  ICreateAddress,
  IUpdateAddress,
} from "../types/address.schema.js";

const addressRepository = AppDataSource.getRepository(UserAddress);

export const createAddressService = async (
  userId: string,
  data: ICreateAddress,
): Promise<{ address: IAddressResponse }> => {
  if (data.isDefault) {
    await addressRepository.update(
      { user_id: userId, isDefault: true },
      { isDefault: false },
    );
  }

  const existingCount = await addressRepository.count({
    where: { user_id: userId },
  });

  const address = addressRepository.create({
    ...data,
    user_id: userId,
    isDefault: data.isDefault ?? existingCount === 0,
  });

  const saved = await addressRepository.save(address);
  return { address: mapAddress(saved) };
};

export const getAddressesService = async (
  userId: string,
): Promise<{ addresses: IAddressResponse[]; total: number }> => {
  const [addresses, total] = await addressRepository.findAndCount({
    where: { user_id: userId },
    order: { isDefault: "DESC", createdAt: "DESC" },
  });

  return { addresses: addresses.map(mapAddress), total };
};

export const getAddressByIdService = async (
  addressId: string,
  userId: string,
): Promise<{ address: IAddressResponse }> => {
  const address = await addressRepository.findOne({
    where: { id: addressId, user_id: userId },
  });

  if (!address) throw new NotFoundError("Address not found");

  return { address: mapAddress(address) };
};

export const updateAddressService = async (
  addressId: string,
  userId: string,
  data: IUpdateAddress,
): Promise<{ address: IAddressResponse }> => {
  const address = await addressRepository.findOne({
    where: { id: addressId, user_id: userId },
  });

  if (!address) throw new NotFoundError("Address not found");

  // if setting this as default, unset the current default first
  if (data.isDefault) {
    await addressRepository.update(
      { user_id: userId, isDefault: true },
      { isDefault: false },
    );
  }

  Object.assign(address, data);
  const saved = await addressRepository.save(address);

  return { address: mapAddress(saved) };
};

export const deleteAddressService = async (
  addressId: string,
  userId: string,
): Promise<{ success: boolean }> => {
  const address = await addressRepository.findOne({
    where: { id: addressId, user_id: userId },
  });

  if (!address) throw new NotFoundError("Address not found");

  await addressRepository.delete({ id: addressId });
  if (address.isDefault) {
    const next = await addressRepository.findOne({
      where: { user_id: userId },
      order: { createdAt: "DESC" },
    });
    if (next) {
      next.isDefault = true;
      await addressRepository.save(next);
    }
  }

  return { success: true };
};

export const setDefaultAddressService = async (
  addressId: string,
  userId: string,
): Promise<{ address: IAddressResponse }> => {
  const address = await addressRepository.findOne({
    where: { id: addressId, user_id: userId },
  });

  if (!address) throw new NotFoundError("Address not found");

  await addressRepository.update(
    { user_id: userId, isDefault: true },
    { isDefault: false },
  );

  address.isDefault = true;
  const saved = await addressRepository.save(address);

  return { address: mapAddress(saved) };
};
