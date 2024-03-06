import axios from "axios";
import { IApiResponse } from "../interfaces/api-data-interface";

export const updatePoint = async (
  ID: number,
  Amount: number
): Promise<IApiResponse | null> => {
  try {
    const res = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/update-point`,
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
