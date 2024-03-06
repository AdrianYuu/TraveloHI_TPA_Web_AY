import axios from "axios";
import { IRoom } from "../interfaces/room-interface";
import { IApiResponse } from "../interfaces/api-data-interface";

export const createRoom = async (Room: IRoom): Promise<IApiResponse | null> => {
  try {
    console.log(Room);
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/create-room`,
      Room,
      { withCredentials: true }
    );

    return {
      StatusCode: res.status,
      Message: res.data.RoomID,
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

export const getRooms = async (): Promise<IRoom[] | null> => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/get-rooms`,
      { withCredentials: true }
    );

    return res.status === 200 ? res.data : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
