import {
  CART_QUANTITY,
  PUSH_NOTIF_MESSAGE,
  SHIFT_NOTIF_MESSAGE,
} from "./actions";

const initialState = {
  cartNumber: 0,
  notifMessages: [],
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
    default:
      return { ...state };
  }
};

export default rootReducer;
