import axios from "axios";
import { IAirportTransit } from "../interfaces/airport-transit-interface";

export const createAirportTransit = async (AirportTransit: IAirportTransit) => {
  try {
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/create-airport-transit`,
      AirportTransit,
      { withCredentials: true }
    );
  } catch (error) {
    console.log(error);
  }
};
