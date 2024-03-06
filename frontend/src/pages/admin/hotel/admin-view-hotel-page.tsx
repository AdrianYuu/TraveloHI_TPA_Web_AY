import styled from "@emotion/styled";
import Sidebar from "../../../components/sidebar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IHotel } from "../../../interfaces/hotel-interface";
import { getHotels } from "../../../api/api-hotel";

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

const TableTitle = styled.p`
  font-size: 2rem;
  font-weight: 600;
  color: #0ca8e8;
  margin-bottom: 1.3rem;
`;

const Picture = styled.img`
  width: 100%;
  max-width: 12rem;
  border-radius: 0.5rem;
  border: 1px solid #687279;
`;

const PictureContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
`;

const HotelFacilityContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 20rem;
  gap: 0.5rem;
`;

const FacilityName = styled.span`
  background-color: #0ca8e8;
  color: white;
  border-radius: 0.5rem;
  padding: 0.3rem 0.6rem;
`;

const NoMessage = styled.p`
  color: #555;
`;

const AdminViewHotelPage = () => {
  const [hotels, setHotels] = useState<IHotel[] | null>(null);

  const fetchData = async () => {
    setHotels(await getHotels());
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <InnerContainer>
        <Sidebar currentpath="/admin/view-hotel" />
        <Wrapper>
          <TableContainer>
            <TableTitle>Hotel List</TableTitle>
            <ButtonContainer>
              <AddButton to="/admin/create-hotel">Create Hotel</AddButton>
            </ButtonContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>No.</Th>
                  <Th>Name</Th>
                  <Th>Description</Th>
                  <Th>Country</Th>
                  <Th>Address</Th>
                  <Th>Facility</Th>
                  <Th>Images</Th>
                </Tr>
              </Thead>
              <Tbody>
                {hotels?.map((hotel, index) => (
                  <Tr key={hotel.ID}>
                    <Td>{index + 1}.</Td>
                    <Td>{hotel.HotelName}</Td>
                    <Td>{hotel.HotelDescription}</Td>
                    <Td>{hotel.Country?.CountryName}</Td>
                    <Td>{hotel.HotelAddress}</Td>
                    <Td>
                      {hotel.HotelFacilities &&
                      hotel.HotelFacilities?.length > 0 ? (
                        <HotelFacilityContainer>
                          {hotel.HotelFacilities.map((facility) => (
                            <FacilityName key={facility.ID}>
                              {facility.FacilityName}
                            </FacilityName>
                          ))}
                        </HotelFacilityContainer>
                      ) : (
                        <NoMessage>No facility.</NoMessage>
                      )}
                    </Td>
                    <Td>
                      <PictureContainer>
                        {hotel.HotelPictures?.map((picture, idx) => (
                          <Picture key={idx} src={picture.URL} />
                        ))}
                      </PictureContainer>
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

export default AdminViewHotelPage;
