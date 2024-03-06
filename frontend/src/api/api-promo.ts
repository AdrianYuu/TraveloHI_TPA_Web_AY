import axios from "axios";
import { IPromo } from "../interfaces/promo-interface";
import { IApiResponse } from "../interfaces/api-data-interface";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

export const isPromoCodeExists = async (
  PromoCode: string
): Promise<string | null> => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/check-promo-code-exists`,
      {
        PromoCode,
      },
      { withCredentials: true }
    );

    return res.status === 200 ? res.data.exists : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getPromos = async (): Promise<IPromo[] | null> => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/get-promos`,
      { withCredentials: true }
    );

    console.log(res.data);

    return res.status === 200 ? res.data : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getPromo = async (PromoID: number): Promise<IPromo | null> => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/get-promo`,
      { PromoID },
      { withCredentials: true }
    );

    return res.status === 200 ? res.data : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getPromoByPromoCode = async (
  PromoCode: string
): Promise<IPromo | null> => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/get-promo-by-promo-code`,
      { PromoCode },
      { withCredentials: true }
    );

    return res.status === 200 ? res.data : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createPromo = async (
  Promo: IPromo
): Promise<IApiResponse | null> => {
  try {
    console.log(Promo);
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/create-promo`,
      Promo,
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

export const updatePromo = async (
  Promo: IPromo
): Promise<IApiResponse | null> => {
  try {
    console.log(Promo);
    const res = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/update-promo`,
      Promo,
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

export const checkUserPromo = async (
  UserID: number,
  PromoCode: string
): Promise<string | null> => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/check-user-promo`,
      { UserID, PromoCode },
      { withCredentials: true }
    );

    return res.status === 200 ? res.data.message : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const usePromo = async (
  UserID: number,
  PromoCode: string
): Promise<string | null> => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/use-promo`,
      { UserID, PromoCode },
      { withCredentials: true }
    );

    return res.status === 200 ? res.data.message : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createPromoFirebase = async (promoData: IPromo) => {
  await addDoc(collection(db, "promo"), promoData);
};
