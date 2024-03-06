import axios from "axios";
import { IRoomPicture } from "../interfaces/room-picture-interface";

export const createRoomPicture = async (RoomPicture: IRoomPicture) => {
  try {
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/create-room-picture`,
      RoomPicture,
      { withCredentials: true }
    );
  } catch (error) {
    console.log(error);
  }
};
