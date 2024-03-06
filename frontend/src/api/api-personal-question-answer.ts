import axios from "axios";
import { IPersonalQuestion } from "../interfaces/personal-question";
import { IPersonalAnswer } from "../interfaces/personal-answer";

export const getPersonalQuestions = async (): Promise<
  IPersonalQuestion[] | null
> => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/get-personal-questions`
    );

    return res.status === 200 ? res.data : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getPersonalQuestionsByEmail = async (
  Email: string
): Promise<IPersonalQuestion[] | null> => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/get-personal-questions-by-email`,
      { Email }
    );

    return res.status === 200 ? res.data : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createPersonalAnswer = async (personalAnswer: IPersonalAnswer) => {
  try {
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/create-personal-answers`,
      personalAnswer
    );
  } catch (error) {
    console.log(error);
  }
};

export const checkPersonalAnswer = async (
  PersonalAnswers: IPersonalAnswer[]
) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/check-personal-answers`,
      { PersonalAnswers }
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
