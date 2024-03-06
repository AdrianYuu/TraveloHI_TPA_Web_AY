import styled from "@emotion/styled";
import Sidebar from "../../../components/sidebar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IAirplane } from "../../../interfaces/airplane-interface";
import { getAirplanes } from "../../../api/api-airplane";

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

const TableTitle = styled.p`
  font-size: 2rem;
  font-weight: 600;
  color: #0ca8e8;
  margin-bottom: 1.3rem;
`;

const AdminViewAirplanePage = () => {
  const [airplanes, setAirplanes] = useState<IAirplane[] | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setAirplanes(await getAirplanes());
  };

  return (
    <Container>
      <InnerContainer>
        <Sidebar currentpath="/admin/view-airplane" />
        <Wrapper>
          <TableContainer>
            <TableTitle>Airplane List</TableTitle>
            <ButtonContainer>
              <AddButton to="/admin/create-airplane">Create Airplane</AddButton>
            </ButtonContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>No.</Th>
                  <Th>Airplane Name</Th>
                  <Th>Airline Name</Th>
                </Tr>
              </Thead>
              <Tbody>
                {airplanes?.map((airplane, index) => (
                  <Tr key={airplane.ID}>
                    <Td>{index + 1}.</Td>
                    <Td>{airplane.AirplaneName}</Td>
                    <Td>{airplane.Airline?.AirlineName}</Td>
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

export default AdminViewAirplanePage;
