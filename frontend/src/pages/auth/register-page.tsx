import styled from "@emotion/styled";
import Navbar from "../../components/navbar";
import InputForm from "../../components/input-form";
import SelectInputForm from "../../components/select-input-form";
import CheckboxInputForm from "../../components/checkbox-input-form";
import PersonalQuestionInputForm from "../../components/personal-question-input-form";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import { IUser } from "../../interfaces/user-interface";
import { IPersonalAnswer } from "../../interfaces/personal-answer";
import { createPersonalAnswer } from "../../api/api-personal-question-answer";
import { registerUser } from "../../api/api-auth";
import FileInputForm from "../../components/file-input-form";
import BlankIcon from "../../assets/Blank_Icon.png";
import { HttpStatusCode } from "axios";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #0ca8e8;
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const FormContainer = styled.div`
  margin: 2rem;
  padding: 1rem;
  background-color: white;
  border-radius: 0.5rem;
  min-width: 40rem;
`;

const FormTitle = styled.p`
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const RegisterForm = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 3rem;
  gap: 1rem;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const RegisterButton = styled.button`
  border: 1px solid #0ca8e8;
  border-radius: 0.2rem;
  color: #0ca8e8;
  background-color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
  padding: 0.5rem;
  margin-top: 1rem;

  &:hover {
    background-color: #0ca8e8;
    color: white;
  }
`;

const RedirectContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  gap: 0.3rem;
`;

const RedirectInformation = styled.div`
  font-size: 1rem;
`;

const RedirectLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-weight: 600;
  font-size: 1rem;
  color: #0ca8e8;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  font-weight: 600;
  font-size: 1rem;
  min-height: 1rem;
  margin-bottom: 0.5rem;
`;

const CaptchaContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Captcha = styled(ReCAPTCHA)``;

const PreviewImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const PreviewImage = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  border: 0.1px solid grey;
`;

interface IPersonalQuestionAnswer {
  id: number;
  question: string;
  answer: string;
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePictureURL, setProfilePictureURL] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);
  const [personalQuestionAnswers, setPersonalQuestionAnswers] = useState<
    IPersonalQuestionAnswer[]
  >([{ id: 0, question: "1", answer: "" }]);
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

  const [error, setError] = useState<string>("");

  const genderOptions = ["Male", "Female"];

  const handlePersonalQuestionChange = (id: number, question: string) => {
    setPersonalQuestionAnswers((prevQuestions) =>
      prevQuestions.map((q) => (q.id === id ? { ...q, question } : q))
    );
  };

  const handlePersonalAnswerChange = (id: number, answer: string) => {
    setPersonalQuestionAnswers((prevQuestions) =>
      prevQuestions.map((q) => (q.id === id ? { ...q, answer } : q))
    );
  };

  const handleAddPersonalQuestion = () => {
    setPersonalQuestionAnswers((prevQuestions) => [
      ...prevQuestions,
      { id: Date.now(), question: "", answer: "" },
    ]);
  };

  const handleRemovePersonalQuestion = (id: number) => {
    setPersonalQuestionAnswers((prevQuestions) =>
      prevQuestions.filter((question) => question.id !== id)
    );
  };

  const unansweredQuestions = personalQuestionAnswers.filter(
    (question) => !question.answer.trim()
  );

  const handleFileInputChange = (file: File | null) => {
    setProfilePicture(file);
  };

  const handleRecaptchaChange = (value: string | null) => {
    setRecaptchaValue(value);
  };

  const handleProfilePicture = async () => {
    if (profilePicture) {
      const fileName = Date.now() + "_" + profilePicture.name;
      const storageRef = ref(storage, "ProfilePicture/" + fileName);
      await uploadBytes(storageRef, profilePicture);
      setProfilePictureURL(await getDownloadURL(storageRef));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await handleProfilePicture();

    const User: IUser = {
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      DateOfBirth: date,
      Password: password,
      ConfirmPassword: confirmPassword,
      Gender: gender,
      ProfilePictureURL: profilePictureURL,
      RoleID: 2,
      IsBanned: false,
      IsSubscribed: checked,
      Points: 0,
      UnAnsweredQuestion: unansweredQuestions.length,
      WalletBalance: 0,
      IsLogin: false,
    };

    const response = await registerUser(User);
    if (response?.StatusCode === HttpStatusCode.Ok) {
      const promises = personalQuestionAnswers.map(
        async (personalQuestionAnswer) => {
          const personalAnswer: IPersonalAnswer = {
            UserID: parseInt(response?.Message, 10),
            PersonalQuestionID: parseInt(personalQuestionAnswer.question, 10),
            Answer: personalQuestionAnswer.answer,
          };
          await createPersonalAnswer(personalAnswer);
        }
      );

      await Promise.all(promises);
      navigate("/login");
    } else {
      setError(response?.Message ?? "Error");
    }
  };

  return (
    <Container>
      <Navbar />
      <InnerContainer>
        <FormContainer>
          <FormTitle>Register Your Account</FormTitle>
          <PreviewImageContainer>
            {profilePicture ? (
              <PreviewImage src={URL.createObjectURL(profilePicture)} />
            ) : (
              <PreviewImage src={BlankIcon} />
            )}
          </PreviewImageContainer>
          <RegisterForm onSubmit={handleSubmit}>
            <InputContainer>
              <InputForm
                label="First Name"
                type="text"
                value={firstName}
                onChange={(value) => setFirstName(value)}
              />
              <InputForm
                label="Last Name"
                type="text"
                value={lastName}
                onChange={(value) => setLastName(value)}
              />
            </InputContainer>
            <InputForm
              label="Email"
              type="text"
              value={email}
              onChange={(value) => setEmail(value)}
            />
            <InputForm
              label="Date Of Birth"
              type="date"
              value={date}
              onChange={(value) => setDate(value)}
            />
            <InputContainer>
              <InputForm
                label="Password"
                type="password"
                value={password}
                onChange={(value) => setPassword(value)}
              />
              <InputForm
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(value) => setConfirmPassword(value)}
              />
            </InputContainer>
            <SelectInputForm
              label="Gender"
              options={genderOptions}
              value={gender}
              onChange={(value) => setGender(value)}
            />
            <FileInputForm
              label="Profile Picture"
              value={profilePicture}
              onChange={handleFileInputChange}
            />
            <PersonalQuestionInputForm
              label="Personal Questions"
              questions={personalQuestionAnswers}
              onAddQuestion={handleAddPersonalQuestion}
              onRemoveQuestion={handleRemovePersonalQuestion}
              onQuestionChange={handlePersonalQuestionChange}
              onAnswerChange={handlePersonalAnswerChange}
            />
            <CheckboxInputForm
              label="I agree to subscribe to the news letter"
              checked={checked}
              onChange={(value) => setChecked(value)}
            />
            <ErrorMessage>{error}</ErrorMessage>
            <CaptchaContainer>
              <Captcha
                sitekey="6LcDYFkpAAAAAKG0XfNYL5fhO5MmSSFZ16fFyoad"
                onChange={handleRecaptchaChange}
              />
            </CaptchaContainer>
            {recaptchaValue && (
              <RegisterButton type="submit">Register</RegisterButton>
            )}
            <RedirectContainer>
              <RedirectInformation>
                Already have an account?
              </RedirectInformation>
              <RedirectLink to="/login">Login</RedirectLink>
            </RedirectContainer>
          </RegisterForm>
        </FormContainer>
      </InnerContainer>
    </Container>
  );
};

export default RegisterPage;
