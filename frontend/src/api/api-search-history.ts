import axios from "axios";
import { IApiResponse } from "../interfaces/api-data-interface";
import { ISearchHistory } from "../interfaces/search-history-interface";

export const createSearchHistory = async (
  SearchHistory: ISearchHistory
): Promise<IApiResponse | null> => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/create-search-history`,
      SearchHistory,
      { withCredentials: true }
    );

    return {
      StatusCode: res.status,
      Message: res.data.UserID,
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

export const getSearchHistory = async (
  UserID: number
): Promise<ISearchHistory[] | null> => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/get-search-history`,
      { UserID },
      { withCredentials: true }
    );

    return res.status === 200 ? res.data : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getTop5SearchHistory = async (): Promise<
  ISearchHistory[] | null
> => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/get-top-5-search-history`,
      { withCredentials: true }
    );

    return res.status === 200 ? res.data : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
