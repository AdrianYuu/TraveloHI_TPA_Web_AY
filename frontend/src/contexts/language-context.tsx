import { createContext, useContext, useState } from "react";
import { IChildren } from "../interfaces/children-interface";
import { ILanguage } from "../interfaces/language-interface";

interface ILanguageContext {
  language: ILanguage | null;
  setLanguage: (newLanguage: string) => void;
  formatNumber: (number: number) => number;
  formatCurrency: (number: number) => string;
}

const context = createContext<ILanguageContext>({} as ILanguageContext);

export function LanguageProvider({ children }: IChildren) {
  const [language, setLanguage] = useState<ILanguage | null>({
    language: "Indonesia",
  });

  const changeLanguage = (newLanguage: string) => {
    setLanguage({ language: newLanguage });
  };

  const formatNumber = (number: number): number => {
    if (language?.language === "Indonesia") {
      return number;
    } else {
      return Math.round(number / 14000);
    }
  };

  const formatCurrency = (number: number): string => {
    if (language?.language === "Indonesia") {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(number);
    } else {
      number /= 14000;
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(number);
    }
  };

  const data = {
    language,
    setLanguage: changeLanguage,
    formatNumber,
    formatCurrency,
  };

  return <context.Provider value={data}>{children}</context.Provider>;
}

export default function useLanguage(): ILanguageContext {
  return useContext(context);
}
