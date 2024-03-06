import axios from "axios";
import { IHotelPicture } from "../interfaces/hotel-picture-interface";

export const createHotelPicture = async (HotelPicture: IHotelPicture) => {
  try {
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/create-hotel-picture`,
      HotelPicture,
      { withCredentials: true }
    );
  } catch (error) {
    console.log(error);
  }
};
