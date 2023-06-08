import { CART_QUANTITY } from "./actions";

const initialState = {
  cartNumber: 0,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_QUANTITY:
      return {
        ...state,
        cartNumber: action.payload,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
