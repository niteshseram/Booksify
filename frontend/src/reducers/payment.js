import {
  PAYMENT_TOKEN_REQUEST,
  PAYMENT_TOKEN_SUCCESS,
  PAYMENT_TOKEN_FAIL,
  PAYMENT_PROCESS_REQUEST,
  PAYMENT_PROCESS_SUCCESS,
  PAYMENT_PROCESS_FAIL,
} from "./../constants/payment";

export const paymentTokenReducer = (state = {}, action) => {
  switch (action.type) {
    case PAYMENT_TOKEN_REQUEST:
      return {
        loading: true,
      };
    case PAYMENT_TOKEN_SUCCESS:
      return {
        loading: false,
        success: true,
        payment: action.payload,
      };
    case PAYMENT_TOKEN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const paymentProcessReducer = (state = {}, action) => {
  switch (action.type) {
    case PAYMENT_PROCESS_REQUEST:
      return {
        loading: true,
      };
    case PAYMENT_PROCESS_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case PAYMENT_PROCESS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
