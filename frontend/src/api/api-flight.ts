import axios from "axios";
import { IFlight } from "../interfaces/flight-interface";
import { IApiResponse } from "../interfaces/api-data-interface";

export const isFlightCodeExists = async (
  FlightCode: string
): Promise<string | null> => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/check-flight-code-exists`,
      {
        FlightCode,
      },
      { withCredentials: true }
    );

    return res.status === 200 ? res.data.exists : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createFlight = async (
  Flight: IFlight
): Promise<IApiResponse | null> => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/create-flight`,
      Flight,
      { withCredentials: true }
    );

    return {
      StatusCode: res.status,
      Message: res.data.FlightID,
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

export const getFlights = async (): Promise<IFlight[] | null> => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/get-flights`,
      { withCredentials: true }
    );

    console.log(res.data);

    return res.status === 200 ? res.data : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getFlight = async (FlightID: number): Promise<IFlight | null> => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/get-flight`,
      {
        FlightID,
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

export const getFlightTop5 = async (): Promise<IFlight[] | null> => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/get-flights-top-5`,
      { withCredentials: true }
    );

    console.log(res.data);
    return res.status === 200 ? res.data : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getFlightsByCountryName = async (
  CountryName: string
): Promise<IFlight[] | null> => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/get-flights-by-country-name`,
      { CountryName },
      { withCredentials: true }
    );

    return res.status === 200 ? res.data : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
