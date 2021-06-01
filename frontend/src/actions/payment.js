import axios from "axios";
import {
  PAYMENT_TOKEN_REQUEST,
  PAYMENT_TOKEN_SUCCESS,
  PAYMENT_TOKEN_FAIL,
  PAYMENT_PROCESS_SUCCESS,
  PAYMENT_PROCESS_FAIL,
  PAYMENT_PROCESS_REQUEST,
} from "./../constants/payment";

export const getPaymentToken = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PAYMENT_TOKEN_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/payment/getToken`, config);

    dispatch({
      type: PAYMENT_TOKEN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PAYMENT_TOKEN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const processPayment = (paymentInfo) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PAYMENT_PROCESS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/payment`, paymentInfo, config);

    dispatch({
      type: PAYMENT_PROCESS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PAYMENT_PROCESS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
