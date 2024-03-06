import axios from "axios";
import { IBroadcast } from "../interfaces/broadcast-interface";
import { IApiResponse } from "../interfaces/api-data-interface";

export const sendBroadcast = async (
  broadcast: IBroadcast
): Promise<IApiResponse | null> => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/send-broadcast`,
      broadcast,
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
