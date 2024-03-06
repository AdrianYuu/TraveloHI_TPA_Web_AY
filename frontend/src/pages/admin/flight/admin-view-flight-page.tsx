import styled from "@emotion/styled";
import Sidebar from "../../../components/sidebar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IFlight } from "../../../interfaces/flight-interface";
import { getFlights } from "../../../api/api-flight";
import useLanguage from "../../../contexts/language-context";

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const InnerContainer = styled.div`
  display: flex;
  height: 100%;
`;

const TableContainer = styled.div`
  width: 100%;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-top: 1rem;
  border: 1px solid #dcdcdc;
`;

const Thead = styled.thead`
  color: white;
  font-weight: 600;
  font-size: 1rem;
`;

const Tbody = styled.tbody`
  text-align: center;
`;

const Tr = styled.tr`
  th {
    background-color: #0ca8e8;
  }

  &:nth-of-type(even) {
    background-color: #f9f9f9;
  }
`;

const Th = styled.th`
  padding: 1rem;
`;

const Td = styled.td`
  padding: 1rem;
`;

const AddButton = styled(Link)`
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const TableTitle = styled.p`
  font-size: 2rem;
  font-weight: 600;
  color: #0ca8e8;
  margin-bottom: 1.3rem;
`;

const AirportTransitsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AirportName = styled.span`
  background-color: #0ca8e8;
  color: white;
  border-radius: 0.5rem;
  padding: 0.3rem 0.6rem;
  margin: 0.2rem;
  display: inline-block;
`;

const NoMessage = styled.p`
  color: #555;
`;

const AdminViewFlightPage = () => {
  const [flights, setFlights] = useState<IFlight[] | null>(null);
  const { formatCurrency } = useLanguage();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setFlights(await getFlights());
  };

  return (
    <Container>
      <InnerContainer>
        <Sidebar currentpath="/admin/view-flight" />
        <Wrapper>
          <TableContainer>
            <TableTitle>Flight List</TableTitle>
            <ButtonContainer>
              <AddButton to="/admin/create-flight">Create Flight</AddButton>
            </ButtonContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>No.</Th>
                  <Th>Flight Code</Th>
                  <Th>Flight Price</Th>
                  <Th>Airplane Name</Th>
                  <Th>Departure Date</Th>
                  <Th>Arrival Date</Th>
                  <Th>Origin</Th>
                  <Th>Transit</Th>
                  <Th>Destination</Th>
                </Tr>
              </Thead>
              <Tbody>
                {flights?.map((flight, index) => (
                  <Tr key={flight.ID}>
                    <Td>{index + 1}.</Td>
                    <Td>{flight.FlightCode}</Td>
                    <Td>{formatCurrency(flight.FlightPrice)}</Td>
                    <Td>{flight.Airplane?.AirplaneName}</Td>
                    <Td>{flight.DepartureDate}</Td>
                    <Td>{flight.ArrivalDate}</Td>
                    <Td>{flight.OriginAirport?.AirportCode}</Td>
                    <Td>
                      {flight.AirportTransits &&
                      flight.AirportTransits?.length > 0 ? (
                        <AirportTransitsContainer>
                          {flight.AirportTransits.map((transit) => (
                            <AirportName key={transit.ID}>
                              {transit.Airport?.AirportCode}
                            </AirportName>
                          ))}
                        </AirportTransitsContainer>
                      ) : (
                        <NoMessage>No transits.</NoMessage>
                      )}
                    </Td>
                    <Td>{flight.DestinationAirport?.AirportCode}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Wrapper>
      </InnerContainer>
    </Container>
  );
};

export default AdminViewFlightPage;
