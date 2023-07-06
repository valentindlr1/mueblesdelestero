export const CART_QUANTITY = "CART_QUANTITY";
export const PUSH_NOTIF_MESSAGE = "PUSH_NOTIF_MESSAGE";
export const SHIFT_NOTIF_MESSAGE = "SHIFT_NOTIF_MESSAGE";

export function cartQuantity(num) {
  return {
    type: CART_QUANTITY,
    payload: num,
  };
}

export function pushNotifMessage(message) {
  return {
    type: PUSH_NOTIF_MESSAGE,
    payload: message,
  };
}

export function shiftNotifMessage() {
  return {
    type: SHIFT_NOTIF_MESSAGE,
  };
}
