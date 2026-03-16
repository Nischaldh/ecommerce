import { AppDataSource } from "../config/data-source.js";
import { Cart } from "../entity/Cart.js";
import { CartItem } from "../entity/CartItem.js";
import { Product } from "../entity/Product.js";
import { NotFoundError, BadRequestError } from "../lib/erros.js";
import { mapCartItem } from "../lib/utlis.js";
import { ICartItemResponse, ICartResponse } from "../types/cart.schema.js";

const cartRepository = AppDataSource.getRepository(Cart);
const cartItemRepository = AppDataSource.getRepository(CartItem);
const productRepository = AppDataSource.getRepository(Product);

export const addToCartService = async (
  userId: string,
  productId: string,
  quantity: number
): Promise<{success:boolean, cartItem: ICartItemResponse}> => {
  const product = await productRepository.findOne({ where: { id: productId } });
  if (!product || product.deleted) throw new NotFoundError("Product not found");
  if (product.stock < quantity) throw new BadRequestError("Not enough stock");

  let cart = await cartRepository.findOne({ where: { user_id: userId } });
  if (!cart) {
    cart = cartRepository.create({ user_id: userId });
    cart = await cartRepository.save(cart);
  }
  let item = await cartItemRepository.findOne({
    where: { cart_id: cart.id, product_id: productId },
    relations: ["cart", "product"],
  });

  if (item) {
    item.quantity += quantity;
    item = await cartItemRepository.save(item);
  } else {
    item = cartItemRepository.create({
      cart_id: cart.id,
      product_id: productId,
      quantity,
    });
    await cartItemRepository.save(item);
    item = await cartItemRepository.findOneOrFail({
      where: { id: item.id },
      relations: ["product"],
    });
  }
  const mappedCart = mapCartItem(item);

  return {success:true, cartItem: mappedCart};
};

export const getCartService = async (userId: string): Promise<ICartResponse | null> => {
  const cart = await cartRepository.findOne({
    where: { user_id: userId },
    relations: ["items", "items.product"],
  });

  if (!cart) return null;

  return {
    id: cart.id,
    items: cart.items.map(mapCartItem),
    createdAt: cart.createdAt,
    updatedAt: cart.updatedAt,
  };
};


export const updateCartItemService = async (
  cartItemId: string,
  userId: string,
  quantity: number
):Promise<{ success: true; item: ICartItemResponse }>  => {

  const item = await cartItemRepository.findOne({
    where: { id: cartItemId },
    relations: ["cart"],
  });

  if (!item) {
    throw new NotFoundError("Cart item not found");
  }

  if (item.cart.user_id !== userId) {
    throw new BadRequestError("Unauthorized action");
  }

  item.quantity = quantity;
  const updatedItem = await cartItemRepository.save(item);
  console.log(updatedItem)
  return { success: true , item:updatedItem}
};

export const removeCartItemService = async (
  cartItemId: string,
  userId: string
):Promise<{success:boolean}> => {

  const item = await cartItemRepository.findOne({
    where: { id: cartItemId },
    relations: ["cart"],
  });

  if (!item) {
    throw new NotFoundError("Cart item not found");
  }

  if (item.cart.user_id !== userId) {
    throw new BadRequestError("Unauthorized action");
  }

  await cartItemRepository.delete({ id: cartItemId });

  return { success: true };
};