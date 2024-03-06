import styled from "@emotion/styled";
import Sidebar from "../../../components/sidebar";
import { FormEvent, useState } from "react";
import InputForm from "../../../components/input-form";
import FileInputForm from "../../../components/file-input-form";
import { storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";
import { createAirline } from "../../../api/api-airline";
import { IAirline } from "../../../interfaces/airline-interface";
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

const AirlineForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Button = styled.button`
  background-color: white;
  border: 1px solid #0ca8e8;
  border-radius: 0.5rem;
  color: #0ca8e8;
  padding: 0.8rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: #0ca8e8;
    color: white;
  }
`;

const ErrorMessage = styled.p`
  font-weight: 600;
  font-size: 1rem;
  color: red;
  min-height: 1rem;
`;

const PreviewPicture = styled.img`
  width: 12rem;
  height: 12rem;
  border: 0.1px solid grey;
`;

const BackLink = styled(Link)`
  background-color: white;
  border: 1px solid #808080;
  border-radius: 0.5rem;
  color: #808080;
  padding: 0.8rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: #808080;
    color: white;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const AdminCreateAirlinePage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [airlinePicture, setAirlinePicture] = useState<File | null>(null);
  const [pictureURL, setPictureURL] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleFileInputChange = (file: File | null) => {
    setAirlinePicture(file);
  };

  const handlePicture = async () => {
    if (airlinePicture) {
      const fileName = Date.now() + "_" + airlinePicture.name;
      const storageRef = ref(storage, "AirlinePicture/" + fileName);
      await uploadBytes(storageRef, airlinePicture);
      setPictureURL(await getDownloadURL(storageRef));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    await handlePicture();

    const Airline: IAirline = {
      AirlineName: name,
      AirlineDescription: description,
      AirlinePictureURL: pictureURL,
    };

    const response = await createAirline(Airline);

    if (response?.StatusCode === HttpStatusCode.Ok) {
      navigate("/admin/view-airline");
    } else {
      setError(response?.Message ?? "Error");
    }
  };

  return (
    <Container>
      <InnerContainer>
        <Sidebar currentpath="/admin/view-airline" />
        <FormContainer>
          <FormTitle>Create Airline</FormTitle>
          <AirlineForm onSubmit={handleSubmit}>
            <InputForm
              label="Airline Name"
              type="text"
              value={name}
              onChange={(value) => setName(value)}
            />
            <InputForm
              label="Airline Description"
              type="text"
              value={description}
              onChange={(value) => setDescription(value)}
            />
            <FileInputForm
              label="Airline Picture"
              value={airlinePicture}
              onChange={handleFileInputChange}
            />
            {airlinePicture && (
              <PreviewPicture src={URL.createObjectURL(airlinePicture)} />
            )}
            <ErrorMessage>{error}</ErrorMessage>
            <ButtonContainer>
              <Button type="submit">Create</Button>
              <BackLink to="/admin/view-airline">Back</BackLink>
            </ButtonContainer>
          </AirlineForm>
        </FormContainer>
      </InnerContainer>
    </Container>
  );
};

export default AdminCreateAirlinePage;
