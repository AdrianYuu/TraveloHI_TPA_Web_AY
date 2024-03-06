import axios from "axios";
import { IApiResponse } from "../interfaces/api-data-interface";
import { IHotelRating } from "../interfaces/hotel-rating-interface";

export const createHotelRating = async (
  HotelRating: IHotelRating
): Promise<IApiResponse | null> => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/create-hotel-rating`,
      HotelRating,
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
