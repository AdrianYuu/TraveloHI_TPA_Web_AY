import styled from "@emotion/styled";
import Navbar from "../../components/navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { changePassword } from "../../api/api-auth";
import InputForm from "../../components/input-form";
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
`;

const ChangePasswordForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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

const ErrorMessage = styled.p`
  color: red;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
`;

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email || "";
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await changePassword(email, password, confirmPassword);
    if (response?.StatusCode === HttpStatusCode.Ok) {
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
          <FormTitle>Change Password</FormTitle>
          <ChangePasswordForm onSubmit={handleSubmit}>
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
            <ErrorMessage>{error}</ErrorMessage>
            <SubmitButton type="submit">Submit</SubmitButton>
          </ChangePasswordForm>
        </FormContainer>
      </InnerContainer>
    </Container>
  );
};

export default ChangePasswordPage;
