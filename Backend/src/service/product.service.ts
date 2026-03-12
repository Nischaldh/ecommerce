import { AppDataSource } from "../config/data-source.js";
import { Product } from "../entity/Product.js";
import { ProductImage } from "../entity/ProductImage.js";
import { NotFoundError } from "../lib/erros.js";
import {
  ICreateProduct,
  IExtendedProduct,
  IProduct,
  IProductResponse,
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

//   response with product details and user name and id
  const fullProduct = await productRepository.findOne({
    where: { id: savedProduct.id },
    relations: ["images", "seller"],
    select: {
      id: true,
      name: true,
      price: true,
      description: true,
      category: true,
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
  console.log("Full Product from DB:", fullProduct); // Debug log
  if (!fullProduct) {
    throw new NotFoundError(
      "Product not found after creation, something went wrong.",
    );
  }
  const fullProductWithMappedImages: IProductResponse = {
    ...fullProduct,
    images: fullProduct.images.map((img) => ({
      id: img.id,
      url: img.img_url, 
    })),
    seller: {
      id: fullProduct.seller.id,
      name: fullProduct.seller.name,
    },
  };
  return { product: fullProductWithMappedImages, success: true };
};
