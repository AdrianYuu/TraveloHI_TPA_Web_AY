import axios from "axios";
import { IAirline } from "../interfaces/airline-interface";
import { IApiResponse } from "../interfaces/api-data-interface";

export const createAirline = async (
  Airline: IAirline
): Promise<IApiResponse | null> => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/create-airline`,
      Airline,
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

export const getAirlines = async (): Promise<IAirline[] | null> => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/get-airlines`,
      { withCredentials: true }
    );

    return res.status === 200 ? res.data : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
