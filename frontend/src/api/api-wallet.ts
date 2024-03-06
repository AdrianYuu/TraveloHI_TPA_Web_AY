import axios from "axios";
import { IApiResponse } from "../interfaces/api-data-interface";

export const updateWallet = async (
  ID: number,
  Amount: number
): Promise<IApiResponse | null> => {
  try {
    const res = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/update-wallet`,
      { ID, Amount },
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

export const payUsingWallet = async (
  UserID: number,
  Amount: number,
  PaymentType: string
): Promise<IApiResponse | null> => {
  try {
    console.log(UserID, Amount);
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/pay-using-wallet`,
      { UserID, Amount, PaymentType },
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
