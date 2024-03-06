import axios from "axios";
import { IUser } from "../interfaces/user-interface";
import { IApiResponse } from "../interfaces/api-data-interface";

export const registerUser = async (
  user: IUser
): Promise<IApiResponse | null> => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/register`,
      user
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

export const loginUser = async (
  Email: string,
  Password: string
): Promise<IUser | null> => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/login`,
      {
        Email,
        Password,
      },
      { withCredentials: true }
    );

    return res.status === 200 ? res.data : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const loginOTPUser = async (
  Email: string,
  OTPCode: string
): Promise<IUser | null> => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/login-otp`,
      {
        Email,
        OTPCode,
      },
      { withCredentials: true }
    );

    return res.status === 200 ? res.data : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const logoutUser = async (UserID: number) => {
  try {
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/logout`,
      { UserID },
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const generateOTP = async (Email: string) => {
  try {
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/create-otp`, {
      Email,
    });
  } catch (error) {
    console.log(error);
  }
};

export const isEmailExists = async (Email: string): Promise<string | null> => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/check-email-exists`,
      {
        Email,
      }
    );

    return res.status === 200 ? res.data.message : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const isEmailFormatValid = async (
  Email: string
): Promise<string | null> => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/check-email-format`,
      {
        Email,
      }
    );

    return res.status === 200 ? res.data.message : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const isPasswordSame = async (
  Email: string,
  Password: string
): Promise<boolean | null> => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/check-password-same`,
      { Email, Password }
    );

    return res.status === 200 ? res.data.same : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const changePassword = async (
  Email: string,
  Password: string,
  ConfirmPassword: string
): Promise<IApiResponse | null> => {
  try {
    const res = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/change-password`,
      { Email, Password, ConfirmPassword }
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
