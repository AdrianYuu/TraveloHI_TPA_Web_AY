import axios from "axios";
import { IRoomFacility } from "../interfaces/room-facility-interface";

export const getRoomFacilities = async (): Promise<IRoomFacility[] | null> => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/get-room-facilities`,
      { withCredentials: true }
    );

    return res.status === 200 ? res.data : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
