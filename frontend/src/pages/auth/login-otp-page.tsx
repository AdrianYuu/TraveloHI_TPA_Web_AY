import styled from "@emotion/styled";
import Navbar from "../../components/navbar";
import InputForm from "../../components/input-form";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  generateOTP,
  isEmailExists,
  isEmailFormatValid,
} from "../../api/api-auth";
import { useDebounce } from "../../hooks/useDebounce";
import useUser from "../../contexts/user-context";
import ReCAPTCHA from "react-google-recaptcha";

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

const GenerateOTPForm = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 0.8rem;
`;

const ContinueButton = styled.button`
  width: 100%;
  height: 2.5rem;
  border-radius: 0.2rem;
  color: #cdd0d1;
  font-weight: 600;
  margin-bottom: 2rem;
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
  margin-bottom: 1rem;

  &:hover {
    background-color: #e0440c;
  }
`;

const DisabledSubmitButton = styled.button`
  width: 100%;
  height: 2.5rem;
  border-radius: 0.2rem;
  font-weight: 600;
  background-color: grey;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
`;

const CaptchaContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 0.6rem;
`;

const Captcha = styled(ReCAPTCHA)``;

const LoginOTPPage = () => {
  const navigate = useNavigate();
  const { loginOTP } = useUser();

  const [email, setEmail] = useState<string>("");
  const debouncedEmail = useDebounce(email, 500);
  const [isValid, setValid] = useState<boolean>(false);
  const [isExists, setExists] = useState<boolean>(false);
  const [OTPCode, setOTPCode] = useState<string>("");
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

  const [errorEmail, setErrorEmail] = useState<string>("");
  const [errorOTP, setErrorOTP] = useState<string>("");

  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);

  const handleRecaptchaChange = (value: string | null) => {
    setRecaptchaValue(value);
  };

  const handleResendClick = () => {
    setTimer(60);
    setRecaptchaValue(null);
  };

  const handleGenerateOTP = async (e: FormEvent) => {
    e.preventDefault();

    if (isExists) {
      setSubmitting(true);
      setTimeout(() => {
        setSubmitting(false);
        setTimer(60);
      }, timer * 1000);
    }

    await generateOTP(email);
  };

  const handleSubmitOTP = async (e: FormEvent) => {
    e.preventDefault();

    if (await loginOTP(email, OTPCode)) {
      navigate("/");
    } else {
      setErrorOTP("OTP code is not valid or your account is banned.");
    }
  };

  useEffect(() => {
    let timeoutId: number;

    const tick = () => {
      setTimer((prevTimer) => {
        const newTimer = prevTimer - 1;

        return newTimer;
      });
    };

    if (timer > 0 && isSubmitting) {
      timeoutId = window.setTimeout(tick, 1000);
    }

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [timer, isSubmitting]);

  useEffect(() => {
    if (isValid) {
      const checkEmailExists = async () => {
        try {
          const emailExists = await isEmailExists(debouncedEmail);

          if (emailExists) {
            setErrorEmail("");
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

  return (
    <Container>
      <Navbar />
      <InnerContainer>
        <FormContainer>
          <FormTitle>Login with OTP</FormTitle>
          <GenerateOTPForm onSubmit={handleGenerateOTP}>
            <InputForm
              label="Email"
              type="text"
              value={email}
              onChange={(value) => setEmail(value)}
              disabled={isSubmitting}
            />
            <ErrorMessage>{errorEmail}</ErrorMessage>
            {isExists ? (
              <>
                {isSubmitting ? (
                  <DisabledSubmitButton type="button">
                    Sent.. {timer}s
                  </DisabledSubmitButton>
                ) : (
                  <SubmitButton type="submit">Send OTP</SubmitButton>
                )}
              </>
            ) : (
              <ContinueButton
                onClick={handleResendClick}
                disabled={isSubmitting}
                type="button"
              >
                {isSubmitting ? `Resending... ${timer}s` : "Continue"}
              </ContinueButton>
            )}
            {isValid && isSubmitting && (
              <>
                <InputForm
                  label="OTP Code"
                  type="text"
                  value={OTPCode}
                  onChange={(value) => setOTPCode(value)}
                />
                <ErrorMessage>{errorOTP}</ErrorMessage>
                <CaptchaContainer>
                  <Captcha
                    sitekey="6LcDYFkpAAAAAKG0XfNYL5fhO5MmSSFZ16fFyoad"
                    onChange={handleRecaptchaChange}
                  />
                </CaptchaContainer>
                {recaptchaValue && (
                  <SubmitButton onClick={handleSubmitOTP}>Submit</SubmitButton>
                )}
              </>
            )}
          </GenerateOTPForm>
        </FormContainer>
      </InnerContainer>
    </Container>
  );
};

export default LoginOTPPage;
