import styled from "@emotion/styled";
import Sidebar from "../../../components/sidebar";
import { FormEvent, useEffect, useState } from "react";
import InputForm from "../../../components/input-form";
import { Link, useNavigate } from "react-router-dom";
import SelectInputForm from "./../../../components/select-input-form";
import { getAirplanes } from "../../../api/api-airplane";
import { getAirports } from "../../../api/api-airport";
import { createFlight } from "../../../api/api-flight";
import { IFlight } from "../../../interfaces/flight-interface";
import { IAirportTransit } from "../../../interfaces/airport-transit-interface";
import { createAirportTransit } from "../../../api/api-airport-transit";
import { HttpStatusCode } from "axios";

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const InnerContainer = styled.div`
  display: flex;
  min-height: 100%;
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

const FlightForm = styled.form`
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

const RemoveButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  border-radius: 0.2rem;
  padding: 0.5rem;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  max-width: 5rem;

  &:hover {
    background-color: #d63031;
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

const TransitContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const AdminCreateFlightPage = () => {
  const navigate = useNavigate();

  const [code, setCode] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [airplaneID, setAirplaneID] = useState<number>(0);
  const [originAirportID, setOriginAirportID] = useState<number>(0);
  const [destinationAirportID, setDestinationAirportID] = useState<number>(0);
  const [airportTransitIDs, setAirportTransitIDs] = useState<number[]>([]);
  const [departureDate, setDepartureDate] = useState<string>("");
  const [arrivalDate, setArrivalDate] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [airplaneOptions, setAirplaneOptions] = useState<
    { id: number; value: string }[]
  >([]);
  const [airportOptions, setAirportOptions] = useState<
    { id: number; value: string }[]
  >([]);

  const handleAddTransitAirport = () => {
    setAirportTransitIDs([...airportTransitIDs, 0]);
  };

  const handleRemoveTransitAirport = (index: number) => {
    const updatedTransitAirports = [...airportTransitIDs];
    updatedTransitAirports.splice(index, 1);
    setAirportTransitIDs(updatedTransitAirports);
  };

  useEffect(() => {
    const fetchAirplanes = async () => {
      const airplanes = await getAirplanes();
      const airplanesOptions = airplanes?.map((airplane) => ({
        id: airplane.ID !== undefined ? airplane.ID : 0,
        value: airplane.Airline?.AirlineName + " - " + airplane.AirplaneName,
      }));
      setAirplaneOptions(airplanesOptions ?? []);
    };

    const fetchAirports = async () => {
      const airports = await getAirports();
      const airportOptions = airports?.map((airport) => ({
        id: airport.ID !== undefined ? airport.ID : 0,
        value: airport.AirportCode + " - " + airport.AirportName,
      }));
      setAirportOptions(airportOptions ?? []);
    };

    fetchAirplanes();
    fetchAirports();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const Flight: IFlight = {
      AirplaneID: airplaneID,
      OriginAirportID: originAirportID,
      DestinationAirportID: destinationAirportID,
      FlightCode: code,
      DepartureDate: departureDate.replace("T", " "),
      ArrivalDate: arrivalDate.replace("T", " "),
      FlightPrice: price,
    };

    const response = await createFlight(Flight);

    if (response?.StatusCode === HttpStatusCode.Ok) {
      const FlightID = response.Message;

      if (FlightID != null) {
        const promises = airportTransitIDs.map(async (transit) => {
          const AirportTransit: IAirportTransit = {
            AirportID: transit,
            FlightID: parseInt(FlightID, 10),
          };
          await createAirportTransit(AirportTransit);
        });

        await Promise.all(promises);
      }
      navigate("/admin/view-flight");
    } else {
      setError(response?.Message ?? "Error");
    }
  };

  return (
    <Container>
      <InnerContainer>
        <Sidebar currentpath="/admin/view-flight" />
        <FormContainer>
          <FormTitle>Create Flight</FormTitle>
          <FlightForm onSubmit={handleSubmit}>
            <InputForm
              label="Flight Code"
              type="text"
              value={code}
              onChange={(value) => setCode(value)}
            />
            <InputForm
              label="Flight Price"
              type="text"
              value={price}
              onChange={(value) => setPrice(value)}
            />
            <SelectInputForm
              label="Airplane"
              options={airplaneOptions}
              value={airplaneID.toString()}
              onChange={(value) => setAirplaneID(parseInt(value, 10))}
            />
            <SelectInputForm
              label="Origin Airport"
              options={airportOptions}
              value={originAirportID.toString()}
              onChange={(value) => setOriginAirportID(parseInt(value, 10))}
            />
            <SelectInputForm
              label="Destination Airport"
              options={airportOptions}
              value={destinationAirportID.toString()}
              onChange={(value) => setDestinationAirportID(parseInt(value, 10))}
            />
            <InputForm
              label="Departure Date"
              type="datetime-local"
              value={departureDate}
              onChange={(value) => setDepartureDate(value)}
            />
            <InputForm
              label="Arrival Date"
              type="datetime-local"
              value={arrivalDate}
              onChange={(value) => setArrivalDate(value)}
            />
            {airportTransitIDs.map((transitID, index) => (
              <TransitContainer key={index}>
                <SelectInputForm
                  label={`Transit Airport ${index + 1}`}
                  options={airportOptions}
                  value={transitID.toString()}
                  onChange={(value) => {
                    const updatedTransitAirports = [...airportTransitIDs];
                    updatedTransitAirports[index] = parseInt(value, 10);
                    setAirportTransitIDs(updatedTransitAirports);
                  }}
                />
                <RemoveButton
                  type="button"
                  onClick={() => handleRemoveTransitAirport(index)}
                >
                  Remove
                </RemoveButton>
              </TransitContainer>
            ))}
            <Button type="button" onClick={handleAddTransitAirport}>
              Add Transit Airport
            </Button>
            <ErrorMessage>{error}</ErrorMessage>
            <ButtonContainer>
              <Button type="submit">Create</Button>
              <BackLink to="/admin/view-flight">Back</BackLink>
            </ButtonContainer>
          </FlightForm>
        </FormContainer>
      </InnerContainer>
    </Container>
  );
};

export default AdminCreateFlightPage;
