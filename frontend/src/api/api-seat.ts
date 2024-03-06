import axios from "axios";
import { IApiResponse } from "../interfaces/api-data-interface";
import { ISeat } from "../interfaces/seat-interface";

export const createSeat = async (Seat: ISeat): Promise<IApiResponse | null> => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/create-seat`,
      Seat,
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
