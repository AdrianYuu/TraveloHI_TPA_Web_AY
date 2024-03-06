import axios from "axios";
import { IApiResponse } from "../interfaces/api-data-interface";

export const sendPaymentEmailToUser = async (
  Email: string,
  Message: string
): Promise<IApiResponse | null> => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/send-payment-email`,
      { Email, Message },
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
