import styled from "@emotion/styled";
import Sidebar from "../../../components/sidebar";
import { FormEvent, useEffect, useState } from "react";
import InputForm from "../../../components/input-form";
import { Link, useNavigate } from "react-router-dom";
import SelectInputForm from "./../../../components/select-input-form";
import { getAirlines } from "../../../api/api-airline";
import { createAirplane } from "../../../api/api-airplane";
import { IAirplane } from "../../../interfaces/airplane-interface";
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

const AirplaneForm = styled.form`
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

const AdminCreateAirplanePage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [airlineID, setAirlineID] = useState<number>(0);
  const [airlineOptions, setAirlineOptions] = useState<
    { id: number; value: string }[]
  >([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchAirlines = async () => {
      const airlines = await getAirlines();
      const airlineOptions = airlines?.map((airline) => ({
        id: airline.ID !== undefined ? airline.ID : 0,
        value: airline.AirlineName,
      }));
      setAirlineOptions(airlineOptions ?? []);
    };

    fetchAirlines();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const Airplane: IAirplane = {
      AirplaneName: name,
      AirlineID: airlineID,
    };

    const response = await createAirplane(Airplane);
    if (response?.StatusCode === HttpStatusCode.Ok) {
      navigate("/admin/view-airplane");
    } else {
      setError(response?.Message ?? "Error");
    }
  };

  return (
    <Container>
      <InnerContainer>
        <Sidebar currentpath="/admin/view-airplane" />
        <FormContainer>
          <FormTitle>Create Airplane</FormTitle>
          <AirplaneForm onSubmit={handleSubmit}>
            <InputForm
              label="Airplane Name"
              type="text"
              value={name}
              onChange={(value) => setName(value)}
            />
            <SelectInputForm
              label="Airline Name"
              options={airlineOptions}
              value={airlineID.toString()}
              onChange={(value) => setAirlineID(parseInt(value, 10))}
            />
            <ErrorMessage>{error}</ErrorMessage>
            <ButtonContainer>
              <Button type="submit">Create</Button>
              <BackLink to="/admin/view-airplane">Back</BackLink>
            </ButtonContainer>
          </AirplaneForm>
        </FormContainer>
      </InnerContainer>
    </Container>
  );
};

export default AdminCreateAirplanePage;
