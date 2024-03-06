import axios from "axios";
import { IAirplane } from "../interfaces/airplane-interface";
import { IApiResponse } from "../interfaces/api-data-interface";

export const isAirplaneNameExists = async (
  AirplaneName: string
): Promise<string | null> => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/check-airplane-name-exists`,
      {
        AirplaneName,
      },
      { withCredentials: true }
    );

    return res.status === 200 ? res.data.exists : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createAirplane = async (
  Airplane: IAirplane
): Promise<IApiResponse | null> => {
  try {
    console.log(Airplane);
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/create-airplane`,
      Airplane,
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

export const getAirplanes = async (): Promise<IAirplane[] | null> => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/get-airplanes`,
      { withCredentials: true }
    );

    return res.status === 200 ? res.data : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
