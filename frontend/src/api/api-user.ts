import axios from "axios";
import { IUser } from "../interfaces/user-interface";
import { IApiResponse } from "../interfaces/api-data-interface";

export const getUsers = async (): Promise<IUser[] | null> => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/get-users`,
      { withCredentials: true }
    );

    return res.status === 200 ? res.data : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const banUser = async (UserID: number) => {
  try {
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/ban-user`,
      {
        UserID,
      },
      { withCredentials: true }
    );
  } catch (error) {
    console.log(error);
  }
};

export const unBanUser = async (UserID: number) => {
  try {
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/unban-user`,
      {
        UserID,
      },
      { withCredentials: true }
    );
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (User: IUser): Promise<IApiResponse | null> => {
  try {
    const res = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/update-user`,
      User,
      { withCredentials: true }
    );

    return {
      StatusCode: res.status,
      Message: res.data.message,
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

export const getUserIDByEmail = async (Email: string) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/get-user-id-by-email`,
      { Email }
    );

    console.log(res.data.UserID);

    return res.status === 200 ? res.data.UserID : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getCurrentUser = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/get-current-user`,
      { withCredentials: true }
    );

    return res.status === 200 ? res.data : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
