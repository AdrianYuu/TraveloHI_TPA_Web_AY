import styled from "@emotion/styled";
import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isEmailExists, isEmailFormatValid } from "../../api/api-auth";
import { useDebounce } from "../../hooks/useDebounce";
import useUser from "../../contexts/user-context";
import Navbar from "../../components/navbar";
import InputForm from "../../components/input-form";
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

const LoginForm = styled.form`
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
`;

const SeparatorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 2.5rem;
`;

const Line = styled.div`
  width: 40%;
  height: 0.1rem;
  background-color: #f0f0f0;
`;

const SeparatorWord = styled.p`
  color: #817d86;
  font-size: 0.8rem;
  font-weight: 500;
  width: 50%;
  text-align: center;
`;

const OTPButton = styled(Link)`
  width: 100%;
  height: 2.5rem;
  border-radius: 0.2rem;
  font-weight: 600;
  background-color: white;
  border: 0.1rem solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: black;
    color: white;
  }
`;

const RegisterLink = styled(Link)`
  width: 100%;
  height: 2.5rem;
  border-radius: 0.2rem;
  font-weight: 600;
  background-color: #2074f4;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #086cdc;
  }
`;

const ForgotPasswordContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 4rem;
`;

const ForgotPassword = styled(Link)`
  font-size: 1rem;
  color: #2074f4;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    color: #086cdc;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
`;

const LoginButton = styled.button`
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

  &:hover {
    background-color: #e0440c;
  }
`;

const RegisterButton = styled(Link)`
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

  &:hover {
    background-color: #e0440c;
  }
`;

const CaptchaContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Captcha = styled(ReCAPTCHA)``;

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useUser();

  const [email, setEmail] = useState<string>("");
  const debouncedEmail = useDebounce(email, 500);
  const [password, setPassword] = useState<string>("");
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [isValid, setValid] = useState<boolean>(false);
  const [isExists, setExists] = useState<boolean>(false);

  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (await login(email, password)) {
      navigate("/");
    } else {
      setError("Email or password is not valid or your account is banned.");
    }
  };

  const handleRecaptchaChange = (value: string | null) => {
    setRecaptchaValue(value);
  };

  useEffect(() => {
    if (isValid) {
      const checkEmailExists = async () => {
        try {
          const emailExists = await isEmailExists(debouncedEmail);

          if (emailExists) {
            setExists(true);
          } else {
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
      setError("");
      if (await isEmailFormatValid(debouncedEmail)) {
        setValid(true);
      } else if (debouncedEmail.trim()) {
        setError("Email format is not valid.");
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
          <FormTitle>Login To Your Account</FormTitle>
          <LoginForm onSubmit={handleSubmit}>
            <InputForm
              label="Email"
              type="text"
              value={email}
              onChange={(value) => setEmail(value)}
            />
            {isExists && (
              <InputForm
                label="Password"
                type="password"
                value={password}
                onChange={(value) => setPassword(value)}
              />
            )}
            <ErrorMessage>{error}</ErrorMessage>
            {!isValid && <ContinueButton>Continue</ContinueButton>}
            {isValid && !isExists && (
              <RegisterButton to="/register">Register</RegisterButton>
            )}
            {isValid && isExists && (
              <>
                <CaptchaContainer>
                  <Captcha
                    sitekey="6LcDYFkpAAAAAKG0XfNYL5fhO5MmSSFZ16fFyoad"
                    onChange={handleRecaptchaChange}
                  />
                </CaptchaContainer>
                {recaptchaValue && (
                  <LoginButton type="submit">Login</LoginButton>
                )}
              </>
            )}
            <SeparatorContainer>
              <Line />
              <SeparatorWord>or login/register with</SeparatorWord>
              <Line />
            </SeparatorContainer>
            <OTPButton to="/login-otp">Login with OTP</OTPButton>
            <RegisterLink to="/register">Register Account</RegisterLink>
            <ForgotPasswordContainer>
              <ForgotPassword to="/forgot-password">
                Forgot Password?
              </ForgotPassword>
            </ForgotPasswordContainer>
          </LoginForm>
        </FormContainer>
      </InnerContainer>
    </Container>
  );
};

export default LoginPage;
