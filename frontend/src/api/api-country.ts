import axios from "axios";
import { ICountry } from "../interfaces/country-interface";

export const getCountries = async (): Promise<ICountry[] | null> => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/get-countries`,
      { withCredentials: true }
    );

    console.log(res.data);

    return res.status === 200 ? res.data : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
