import styled from "@emotion/styled";
import Sidebar from "../../../components/sidebar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IRoom } from "../../../interfaces/room-interface";
import { getRooms } from "../../../api/api-room";
import useLanguage from "../../../contexts/language-context";

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

const RoomFacilityContainer = styled.div`
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

const AdminViewRoomPage = () => {
  const [rooms, setRooms] = useState<IRoom[] | null>(null);
  const { formatCurrency } = useLanguage();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setRooms(await getRooms());
  };

  return (
    <Container>
      <InnerContainer>
        <Sidebar currentpath="/admin/view-room" />
        <Wrapper>
          <TableContainer>
            <TableTitle>Room List</TableTitle>
            <ButtonContainer>
              <AddButton to="/admin/create-room">Create Room</AddButton>
            </ButtonContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>No.</Th>
                  <Th>Hotel</Th>
                  <Th>Room Type</Th>
                  <Th>Price</Th>
                  <Th>Facility</Th>
                  <Th>Images</Th>
                </Tr>
              </Thead>
              <Tbody>
                {rooms?.map((room, index) => (
                  <Tr key={room.ID}>
                    <Td>{index + 1}.</Td>
                    <Td>{room.Hotel?.HotelName}</Td>
                    <Td>{room.RoomType?.RoomTypeName}</Td>
                    <Td>{formatCurrency(parseInt(room.RoomPrice))}</Td>
                    <Td>
                      {room.RoomFacilities &&
                      room.RoomFacilities?.length > 0 ? (
                        <RoomFacilityContainer>
                          {room.RoomFacilities.map((facility) => (
                            <FacilityName key={facility.ID}>
                              {facility.FacilityName}
                            </FacilityName>
                          ))}
                        </RoomFacilityContainer>
                      ) : (
                        <NoMessage>No facility.</NoMessage>
                      )}
                    </Td>
                    <Td>
                      <PictureContainer>
                        {room.RoomPictures?.map((picture, idx) => (
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

export default AdminViewRoomPage;
