import { createContext, useContext, useState } from "react";
import { IChildren } from "../interfaces/children-interface";
import { IUser } from "../interfaces/user-interface";
import { loginOTPUser, loginUser, logoutUser } from "../api/api-auth";
import { getCurrentUser } from "../api/api-user";

interface IUserContext {
  user: IUser | null;
  login: (name: string, password: string) => Promise<boolean>;
  loginOTP: (name: string, otpCode: string) => Promise<boolean>;
  logout: (userID: number) => void;
  refetchUser: () => Promise<void>;
}

const context = createContext<IUserContext>({} as IUserContext);

export function UserProvider({ children }: IChildren) {
  const USER_KEY = "TPA_WEB_TraveloHI";

  const [user, setUser] = useState<IUser | null>(
    localStorage.getItem(USER_KEY)
      ? (JSON.parse(localStorage.getItem(USER_KEY) as string) as IUser)
      : null
  );

  const login = async (email: string, password: string) => {
    const result = await loginUser(email, password);

    if (result) {
      setUser(result);
      localStorage.setItem(USER_KEY, JSON.stringify(result));
      return true;
    } else {
      setUser(null);
      return false;
    }
  };

  const loginOTP = async (email: string, otpCode: string) => {
    const result = await loginOTPUser(email, otpCode);

    if (result) {
      setUser(result);
      localStorage.setItem(USER_KEY, JSON.stringify(result));
      return true;
    } else {
      setUser(null);
      return false;
    }
  };

  const logout = async (userID: number) => {
    await logoutUser(userID);
    setUser(null);
    localStorage.removeItem(USER_KEY);
  };

  const refetchUser = async () => {
    const currentUser = await getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      localStorage.setItem(USER_KEY, JSON.stringify(currentUser));
    }
  };

  const data = { user, login, loginOTP, logout, refetchUser };

  return <context.Provider value={data}>{children}</context.Provider>;
}

export default function useUser(): IUserContext {
  return useContext(context);
}
