import axios from "axios";
import { IHotelFacility } from "../interfaces/hotel-facility-interface";

export const getHotelFacilities = async (): Promise<
  IHotelFacility[] | null
> => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/get-hotel-facilities`,
      { withCredentials: true }
    );

    return res.status === 200 ? res.data : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
