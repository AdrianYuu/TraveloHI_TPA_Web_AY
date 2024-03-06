import axios from "axios";
import { IApiResponse } from "../interfaces/api-data-interface";
import { IHotelReview } from "../interfaces/hotel-review-interface";

export const createHotelReview = async (
  HotelReview: IHotelReview
): Promise<IApiResponse | null> => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/create-hotel-review`,
      HotelReview,
      { withCredentials: true }
    );

    return {
      StatusCode: res.status,
      Message: res.data.HotelReviewID,
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
