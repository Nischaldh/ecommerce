import type { Context } from "koa";
import { productValidation } from "../validations/product.validation.js";
import { BadRequestError } from "../lib/erros.js";
import { uploadToCloudinary } from "../lib/cloudinaryUpload.js";
import { createProductService } from "../service/product.service.js";

export const getAllProduct = async (ctx: Context) => {
  ctx.status = 200;
  ctx.body = {
    message: "Successfully",
  };
};

export const getAProduct = async (ctx: Context) => {
  ctx.status = 200;
  ctx.body = {
    message: "Successfully",
  };
};

export const editProduct = async (ctx: Context) => {
  ctx.status = 200;
  ctx.body = {
    message: "Successfully",
  };
};

export const deleteProduct = async (ctx: Context) => {
  ctx.status = 200;
  ctx.body = {
    message: "Successfully",
  };
};

export const createProduct = async (ctx: Context) => {
  // validate request
  const validatedData = await productValidation.validate(ctx.request.body);
  const userId = ctx.state.user.id;

  //   getting primary image and secondary images as image.
  const files = ctx.files as {
    primaryImage?: Express.Multer.File[];
    images?: Express.Multer.File[];
  };
  if (!files?.primaryImage || files.primaryImage.length === 0) {
    throw new BadRequestError("Primary image is required");
  }

  const primaryImageFile = files.primaryImage[0];
  const primaryUpload = await uploadToCloudinary(
    primaryImageFile.buffer,
    "products",
  );
  const primaryImageUrl = primaryUpload.url;

  let secondaryImageUrls: string[] = [];
  if (files.images) {
    const uploads = await Promise.all(
      files.images.map((file) => uploadToCloudinary(file.buffer, "products")),
    );
    secondaryImageUrls = uploads.map((img: any) => img.url);
  }
  const result = await createProductService({
    ...validatedData,
    primaryImage: primaryImageUrl,
    images: secondaryImageUrls.map((url) => ({ url })),
    seller_id: userId,
  });
  if(!result.product||!result.success){
    throw new BadRequestError("Product creation failed");
  }
    ctx.status = 201;
    ctx.body = {
        success: true,
        product: result.product,
        };
};
