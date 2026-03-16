
import type { Context } from "koa";
import { addressParamValidation, createAddressValidation, updateAddressValidation } from "../validations/address.validation.js";
import { createAddressService, deleteAddressService, getAddressByIdService, getAddressesService, setDefaultAddressService, updateAddressService } from "../service/address.service.js";



export const createAddress = async (ctx: Context) => {
  const userId = ctx.state.user.id;
  const data = await createAddressValidation.validate(ctx.request.body, {
    stripUnknown: true,
  });
  const result = await createAddressService(userId, data);
  ctx.status = 201;
  ctx.body = {
    success: true,
    message: "Address created successfully",
    address: result.address,
  };
};

export const getAddresses = async (ctx: Context) => {
  const userId = ctx.state.user.id;
  const result = await getAddressesService(userId);
  ctx.status = 200;
  ctx.body = {
    success: true,
    addresses: result.addresses,
    total: result.total,
  };
};

export const getAddressById = async (ctx: Context) => {
  const { id } = await addressParamValidation.validate(ctx.params);
  const userId = ctx.state.user.id;
  const result = await getAddressByIdService(id, userId);
  ctx.status = 200;
  ctx.body = {
    success: true,
    address: result.address,
  };
};

export const updateAddress = async (ctx: Context) => {
  const { id } = await addressParamValidation.validate(ctx.params);
  const userId = ctx.state.user.id;
  const data = await updateAddressValidation.validate(ctx.request.body, {
    stripUnknown: true,
  });
  const result = await updateAddressService(id, userId, data);
  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Address updated successfully",
    address: result.address,
  };
};

export const deleteAddress = async (ctx: Context) => {
  const { id } = await addressParamValidation.validate(ctx.params);
  const userId = ctx.state.user.id;
  await deleteAddressService(id, userId);
  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Address deleted successfully",
  };
};

export const setDefaultAddress = async (ctx: Context) => {
  const { id } = await addressParamValidation.validate(ctx.params);
  const userId = ctx.state.user.id;
  const result = await setDefaultAddressService(id, userId);
  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Default address updated",
    address: result.address,
  };
};