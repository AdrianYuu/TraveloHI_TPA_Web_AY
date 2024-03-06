import axios from "axios";
import { IAirport } from "../interfaces/airport-interface";

export const getAirports = async (): Promise<IAirport[] | null> => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/get-airports`,
      { withCredentials: true }
    );
    
    return res.status === 200 ? res.data : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
