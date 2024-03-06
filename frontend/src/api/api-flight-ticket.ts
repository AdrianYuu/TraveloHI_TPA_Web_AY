import axios from "axios";
import { IApiResponse } from "../interfaces/api-data-interface";
import { IFlightTicket } from "../interfaces/flight-ticket-interface";

export const createFlightTicket = async (
  FlightTicket: IFlightTicket
): Promise<IApiResponse | null> => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/create-flight-ticket`,
      FlightTicket,
      { withCredentials: true }
    );

    return {
      StatusCode: res.status,
      Message: res.data.FlightTicketID,
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

export const getFlightTicketsUnpaid = async (
  UserID: number
): Promise<IFlightTicket[] | null> => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/get-flight-tickets-unpaid`,
      { UserID },
      { withCredentials: true }
    );

    return res.status === 200 ? res.data : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getFlightTicketsPaid = async (
  UserID: number
): Promise<IFlightTicket[] | null> => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/get-flight-tickets-paid`,
      { UserID },
      { withCredentials: true }
    );

    return res.status === 200 ? res.data : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateFlightTicketStatus = async (
  FlightTicketID: number,
  Status: string
): Promise<IApiResponse | null> => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/update-flight-ticket-status`,
      { FlightTicketID, Status },
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
