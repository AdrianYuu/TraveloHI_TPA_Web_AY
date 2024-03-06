import axios from "axios";
import { IApiResponse } from "../interfaces/api-data-interface";
import { IHotelBooking } from "../interfaces/hotel-booking-interface";

export const createHotelBooking = async (
  HotelBooking: IHotelBooking
): Promise<IApiResponse | null> => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/create-hotel-booking`,
      HotelBooking,
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

export const getHotelBookingsUnpaid = async (
  UserID: number
): Promise<IHotelBooking[] | null> => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/get-hotel-bookings-unpaid`,
      { UserID },
      { withCredentials: true }
    );

    return res.status === 200 ? res.data : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getHotelBookingsPaid = async (
  UserID: number
): Promise<IHotelBooking[] | null> => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/get-hotel-bookings-paid`,
      { UserID },
      { withCredentials: true }
    );
    return res.status === 200 ? res.data : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateHotelBooking = async (
  ID: number,
  CheckInDate: string,
  CheckOutDate: string
): Promise<IApiResponse | null> => {
  try {
    const res = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/update-hotel-booking`,
      { ID, CheckInDate, CheckOutDate },
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

export const updateHotelBookingStatus = async (
  HotelBookingID: number,
  Status: string
): Promise<IApiResponse | null> => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/update-hotel-booking-status`,
      { HotelBookingID, Status },
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

export const updateHotelBookingReviewStatus = async (
  HotelBookingID: number
): Promise<IApiResponse | null> => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/update-hotel-booking-review-status`,
      { HotelBookingID },
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
