import styled from "@emotion/styled";
import Sidebar from "../../../components/sidebar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IAirline } from "../../../interfaces/airline-interface";
import { getAirlines } from "../../../api/api-airline";

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const InnerContainer = styled.div`
  display: flex;
  min-height: 100%;
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
  vertical-align: top;
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

const PromoPicture = styled.img`
  width: 8rem;
  height: 8rem;
`;

const TableTitle = styled.p`
  font-size: 2rem;
  font-weight: 600;
  color: #0ca8e8;
  margin-bottom: 1.3rem;
`;

const AirplaneNamesContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const AirplaneName = styled.span`
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

const AdminViewAirlinePage = () => {
  const [airlines, setAirlines] = useState<IAirline[] | null>(null);
  
  const fetchData = async () => {
    setAirlines(await getAirlines());
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <InnerContainer>
        <Sidebar currentpath="/admin/view-airline" />
        <Wrapper>
          <TableContainer>
            <TableTitle>Airline List</TableTitle>
            <ButtonContainer>
              <AddButton to="/admin/create-airline">Create Airline</AddButton>
            </ButtonContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>No.</Th>
                  <Th>Airline Name</Th>
                  <Th>Description</Th>
                  <Th>Airline Picture</Th>
                  <Th>Airplane List</Th>
                </Tr>
              </Thead>
              <Tbody>
                {airlines?.map((airline, index) => (
                  <Tr key={airline.ID}>
                    <Td>{index + 1}.</Td>
                    <Td>{airline.AirlineName}</Td>
                    <Td>{airline.AirlineDescription}</Td>
                    <Td>
                      <PromoPicture src={airline.AirlinePictureURL} />
                    </Td>
                    <Td>
                      {airline.Airplanes && airline.Airplanes?.length > 0 ? (
                        <AirplaneNamesContainer>
                          {airline.Airplanes.map((airplane) => (
                            <AirplaneName key={airplane.ID}>
                              {airplane.AirplaneName}
                            </AirplaneName>
                          ))}
                        </AirplaneNamesContainer>
                      ) : (
                        <NoMessage>No airplanes.</NoMessage>
                      )}
                    </Td>
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

export default AdminViewAirlinePage;
