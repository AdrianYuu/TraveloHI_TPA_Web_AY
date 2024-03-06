import axios from "axios";
import { IRoomType } from "../interfaces/room-type-interface";

export const getRoomTypes = async (): Promise<IRoomType[] | null> => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/get-room-types`,
      { withCredentials: true }
    );

    return res.status === 200 ? res.data : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
