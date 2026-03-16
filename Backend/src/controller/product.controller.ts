import type { Context } from "koa";
import { getProductParamValidation, getProductsValidation, productValidation, updateProductValidation } from "../validations/product.validation.js";
import { BadRequestError } from "../lib/erros.js";
import { uploadToCloudinary } from "../lib/cloudinaryUpload.js";
import { createProductService,  deleteProductService,  editProductService,  getAProductService,  getProductsService } from "../service/product.service.js";

export const getAllProduct = async (ctx: Context) => {
  const validatedQuery = await getProductsValidation.validate(ctx.request.query);
  const result = await getProductsService(validatedQuery);
  ctx.status = 200;
  ctx.body = {
    success: true,
    products: result.products,
    total: result.total,
  };
};

export const getAProduct = async (ctx: Context) => {
  const { id } = await getProductParamValidation.validate(ctx.params) as { id: string };
  const product = await getAProductService(id);
  ctx.status = 200;
  ctx.body = {
    success: true,
    product: product.product,
  };
};

export const editProduct = async (ctx: Context) => {
  const { id } = (await getProductParamValidation.validate(
    ctx.params,
  )) as { id: string };

  const sellerId = ctx.state.user.id;

  const validatedData = await updateProductValidation.validate(
    ctx.request.body,
    { stripUnknown: true }
  );

  const files = ctx.files as {
    primaryImage?: Express.Multer.File[];
    images?: Express.Multer.File[];
  };

  let primaryImageUrl: string | undefined;

  if (files?.primaryImage && files.primaryImage.length > 0) {
    const upload = await uploadToCloudinary(
      files.primaryImage[0].buffer,
      "products",
    );
    primaryImageUrl = upload.url;
  }

  let secondaryImageUrls: string[] = [];

  if (files?.images) {
    const uploads = await Promise.all(
      files.images.map((file) =>
        uploadToCloudinary(file.buffer, "products"),
      ),
    );

    secondaryImageUrls = uploads.map((img: any) => img.url);
  }

  const result = await editProductService(id, sellerId, {
    ...validatedData,
    ...(primaryImageUrl && { primaryImage: primaryImageUrl }),
    ...(secondaryImageUrls.length > 0 && {
      images: secondaryImageUrls.map((url) => ({ url })),
    }),
  });

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Product updated successfully",
    product: result.product,
  };
};

export const deleteProduct = async (ctx: Context) => {
  const { id } = (await getProductParamValidation.validate(
    ctx.params,
  )) as { id: string };

  const sellerId = ctx.state.user.id;

  const result = await deleteProductService(id, sellerId);

  if (!result.success) {
    throw new BadRequestError("Product deletion failed");
  }

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Product deleted successfully",
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
        message:"Product created successfully",
        product: result.product,
        };
};
