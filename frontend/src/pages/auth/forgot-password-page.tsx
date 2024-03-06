import styled from "@emotion/styled";
import Navbar from "../../components/navbar";
import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputForm from "../../components/input-form";
import { useDebounce } from "../../hooks/useDebounce";
import { isEmailExists, isEmailFormatValid } from "../../api/api-auth";
import {
  checkPersonalAnswer,
  getPersonalQuestionsByEmail,
} from "../../api/api-personal-question-answer";
import { IPersonalQuestion } from "../../interfaces/personal-question";
import { IPersonalAnswer } from "../../interfaces/personal-answer";
import { getUserIDByEmail } from "../../api/api-user";
import { HttpStatusCode } from "axios";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #0ca8e8;
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

const FormContainer = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  margin: 2rem;
  min-width: 25rem;
  padding: 1rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormTitle = styled.p`
  font-size: 2rem;
  font-weight: 600;
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 2.5rem;
  border-radius: 0.2rem;
  font-weight: 600;
  background-color: #ff5c1c;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;

  &:hover {
    background-color: #e0440c;
  }
`;

const ResetForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContinueButton = styled.button`
  width: 100%;
  height: 2.5rem;
  border-radius: 0.2rem;
  color: #cdd0d1;
  font-weight: 600;
  margin-bottom: 2rem;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
`;

const PersonalQuestionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Line = styled.div`
  width: 100%;
  height: 0.1rem;
  background-color: #f0f0f0;
`;

const RedirectContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 0.3rem;
  padding-bottom: 1.5rem;
`;

const RedirectInformation = styled.div`
  font-size: 1rem;
`;

const RedirectLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-weight: 600;
  font-size: 1rem;
  color: #2074f4;

  &:hover {
    color: #086cdc;
    text-decoration: underline;
  }
`;

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const [userID, setUserID] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const debouncedEmail = useDebounce(email, 500);
  const [personalAnswers, setPersonalAnswers] = useState<IPersonalAnswer[]>([]);
  const [personalQuestions, setPersonalQuestions] = useState<
    IPersonalQuestion[] | null
  >(null);

  const [errorEmail, setErrorEmail] = useState<string>("");
  const [errorAnswer, setErrorAnswer] = useState<string>("");

  const [isValid, setValid] = useState<boolean>(false);
  const [isExists, setExists] = useState<boolean>(false);
  const [isQuestionShow, setQuestionShow] = useState<boolean>(false);

  useEffect(() => {
    if (personalQuestions) {
      const initialAnswers: IPersonalAnswer[] = personalQuestions.map(
        (question) => ({
          PersonalQuestionID: question.ID ?? 0,
          Answer: "",
        })
      );
      setPersonalAnswers(initialAnswers);
      setQuestionShow(true);
    }
  }, [personalQuestions]);

  useEffect(() => {
    if (isValid) {
      const checkEmailExists = async () => {
        try {
          const emailExists = await isEmailExists(debouncedEmail);

          if (emailExists) {
            setExists(true);
          } else {
            setErrorEmail("Email is not exist.");
            setExists(false);
          }
        } catch (error) {}
      };

      if (debouncedEmail) {
        checkEmailExists();
      } else {
        setExists(false);
      }
    }
  }, [debouncedEmail, isValid]);

  useEffect(() => {
    const validate = async () => {
      setErrorEmail("");
      if (await isEmailFormatValid(debouncedEmail)) {
        setValid(true);
      } else if (debouncedEmail.trim()) {
        setErrorEmail("Email format is not valid.");
        setValid(false);
        setExists(false);
      }
    };

    validate();
  }, [debouncedEmail]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setUserID(await getUserIDByEmail(email));
    setPersonalQuestions(await getPersonalQuestionsByEmail(email));
  };

  const handleAnswerChange = (
    index: number,
    value: string,
    personalQuestionID: number
  ) => {
    setPersonalAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[index] = {
        ...newAnswers[index],
        UserID: userID,
        PersonalQuestionID: personalQuestionID,
        Answer: value,
      };
      return newAnswers;
    });
  };

  const handleAnswerSubmit = async () => {
    setErrorAnswer("");
    console.log(userID);
    const response = await checkPersonalAnswer(personalAnswers);
    if (response?.StatusCode === HttpStatusCode.Ok) {
      navigate("/change-password", { state: { email } });
      setQuestionShow(false);
    } else {
      setErrorAnswer(response?.Message);
    }
  };

  return (
    <Container>
      <Navbar />
      <InnerContainer>
        <FormContainer>
          <FormTitle>Forgot Password</FormTitle>
          <ResetForm onSubmit={handleSubmit}>
            <InputForm
              label="Email"
              type="text"
              value={email}
              onChange={(value) => setEmail(value)}
              disabled={isQuestionShow}
            />
            <ErrorMessage>{errorEmail}</ErrorMessage>
            {!isQuestionShow && (
              <>
                {isExists ? (
                  <SubmitButton type="submit">
                    Show Personal Questions
                  </SubmitButton>
                ) : (
                  <>
                    <ContinueButton type="button">Continue</ContinueButton>
                    <RedirectContainer>
                      <RedirectInformation>
                        Already have an account?
                      </RedirectInformation>
                      <RedirectLink to="/login">Login</RedirectLink>
                    </RedirectContainer>
                  </>
                )}
              </>
            )}
            {isQuestionShow && (
              <>
                <Line />
                <PersonalQuestionContainer>
                  <FormTitle>Personal Question</FormTitle>
                  {personalQuestions?.map((qa, index) => (
                    <InputForm
                      key={index}
                      label={qa.Question}
                      type="text"
                      value={personalAnswers[index].Answer || ""}
                      onChange={(value) =>
                        handleAnswerChange(index, value, qa.ID ?? 0)
                      }
                    />
                  ))}
                  <ErrorMessage>{errorAnswer}</ErrorMessage>
                  <SubmitButton onClick={handleAnswerSubmit} type="button">
                    Submit
                  </SubmitButton>
                </PersonalQuestionContainer>
              </>
            )}
          </ResetForm>
        </FormContainer>
      </InnerContainer>
    </Container>
  );
};

export default ForgotPasswordPage;
