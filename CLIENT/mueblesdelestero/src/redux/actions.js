export const CART_QUANTITY = "CART_QUANTITY";

export function cartQuantity(num) {
  return {
    type: CART_QUANTITY,
    payload: num,
  };
}
