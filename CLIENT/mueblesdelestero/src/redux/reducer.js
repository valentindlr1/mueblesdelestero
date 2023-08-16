import {
  CART_QUANTITY,
  PUSH_NOTIF_MESSAGE,
  SHIFT_NOTIF_MESSAGE,
  SET_TOTAL_PRICE,
} from "./actions";

const initialState = {
  cartNumber: 0,
  notifMessages: [],
  totalPrice: 0,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_QUANTITY:
      return {
        ...state,
        cartNumber: action.payload,
      };
    case PUSH_NOTIF_MESSAGE:
      return {
        ...state,
        notifMessages: [...state.notifMessages, action.payload],
      };
    case SHIFT_NOTIF_MESSAGE:
      let notifAux = state.notifMessages;
      notifAux.shift();
      console.log("REDUCER MESSAGES: ", notifAux);
      return {
        ...state,
        notifMessages: [...notifAux],
      };
    case SET_TOTAL_PRICE:
      return {
        ...state,
        totalPrice: action.payload
      }
    default:
      return { ...state };
  }
};

export default rootReducer;
