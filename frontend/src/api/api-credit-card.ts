import axios from "axios";
import { ICreditCard } from "../interfaces/credit-card-interface";
import { IApiResponse } from "../interfaces/api-data-interface";

export const createCreditCard = async (
  CreditCard: ICreditCard
): Promise<IApiResponse | null> => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/create-credit-card`,
      CreditCard,
      { withCredentials: true }
    );

    return {
      StatusCode: res.status,
      Message: res.data.UserID,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        StatusCode: error.response.status,
        Message: error.response.data.message,
      };
    }

    return null;
  }
};

export const getCreditCards = async (
  UserID: number
): Promise<ICreditCard[] | null> => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/get-credit-cards`,
      { UserID },
      { withCredentials: true }
    );

    return res.status === 200 ? res.data : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const payUsingCreditCard = async (
  UserID: number,
  CreditCardID: number,
  PaymentType: string
): Promise<IApiResponse | null> => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/pay-using-credit-card`,
      { UserID, CreditCardID, PaymentType },
      { withCredentials: true }
    );

    return {
      StatusCode: res.status,
      Message: res.data.message,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        StatusCode: error.response.status,
        Message: error.response.data.message,
      };
    }

    return null;
  }
};
