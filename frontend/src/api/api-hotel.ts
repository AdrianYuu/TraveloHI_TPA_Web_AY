import axios from "axios";
import { IHotel } from "../interfaces/hotel-interface";
import { IApiResponse } from "../interfaces/api-data-interface";

export const createHotel = async (
  Hotel: IHotel
): Promise<IApiResponse | null> => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/create-hotel`,
      Hotel,
      { withCredentials: true }
    );

    return {
      StatusCode: res.status,
      Message: res.data.HotelID,
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

export const getHotels = async (): Promise<IHotel[] | null> => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/get-hotels`,
      { withCredentials: true }
    );

    return res.status === 200 ? res.data : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getHotel = async (HotelID: number): Promise<IHotel | null> => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/get-hotel`,
      {
        HotelID,
      },
      { withCredentials: true }
    );
    console.log(res.data);
    return res.status === 200 ? res.data : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getHotelTop5 = async (): Promise<IHotel[] | null> => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/get-hotels-top-5`,
      { withCredentials: true }
    );

    console.log(res.data);
    return res.status === 200 ? res.data : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getHotelsByCountryName = async (
  CountryName: string
): Promise<IHotel[] | null> => {
  try {
    console.log("Country Name: ", CountryName);
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/get-hotels-by-country-name`,
      { CountryName },
      { withCredentials: true }
    );

    console.log(res.data);
    return res.status === 200 ? res.data : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
