import styled from "@emotion/styled";
import Sidebar from "../../../components/sidebar";
import InputForm from "../../../components/input-form";
import { FormEvent, useState } from "react";
import { IBroadcast } from "../../../interfaces/broadcast-interface";
import { sendBroadcast } from "../../../api/api-broadcast";
import { HttpStatusCode } from "axios";

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const InnerContainer = styled.div`
  display: flex;
  height: 100%;
`;

const FormContainer = styled.div`
  width: 100%;
  margin: 2rem;
`;

const FormTitle = styled.p`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: #0ca8e8;
`;

const BroadcastForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const BroadcastInput = styled.textarea`
  resize: vertical;
  border-radius: 0.2rem;
  border: 1px solid #d0d4d4;
  padding: 0.5rem 0.4rem;
  color: black;
  font-size: 1rem;
  min-height: 20rem;

  &:focus {
    outline: 1px solid #0ca8e8;
  }
`;

const BroadcastLabel = styled.p`
  font-size: 1rem;
  color: #687279;
  margin-bottom: 0.5rem;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubmitButton = styled.button`
  background-color: white;
  border: 1px solid #0ca8e8;
  border-radius: 0.5rem;
  color: #0ca8e8;
  padding: 0.8rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.2s, color 0.2s;
  max-width: 6rem;

  &:hover {
    background-color: #0ca8e8;
    color: white;
  }
`;

const ErrorMessage = styled.p`
  font-weight: 600;
  font-size: 1rem;
  color: red;
`;

const AdminSendBroadcastPage = () => {
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleBroadcastInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessage(event.target.value);
  };

  const clearInput = () => {
    setTitle("");
    setMessage("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const Broadcast: IBroadcast = {
      title: title,
      message: message,
    };

    const response = await sendBroadcast(Broadcast);
    if (response?.StatusCode === HttpStatusCode.Ok) {
      clearInput();
    } else {
      setErrorMessage(response?.Message ?? "Error");
    }
  };

  return (
    <Container>
      <InnerContainer>
        <Sidebar currentpath="/admin/send-broadcast" />
        <FormContainer>
          <FormTitle>Send Broadcast</FormTitle>
          <BroadcastForm onSubmit={handleSubmit}>
            <InputForm
              label="Broadcast Title"
              type="text"
              value={title}
              onChange={(value) => setTitle(value)}
            />
            <MessageContainer>
              <BroadcastLabel>Broadcast message</BroadcastLabel>
              <BroadcastInput
                value={message}
                onChange={handleBroadcastInputChange}
              />
            </MessageContainer>
            <ErrorMessage>{errorMessage}</ErrorMessage>
            <SubmitButton type="submit">Submit</SubmitButton>
          </BroadcastForm>
        </FormContainer>
      </InnerContainer>
    </Container>
  );
};

export default AdminSendBroadcastPage;
