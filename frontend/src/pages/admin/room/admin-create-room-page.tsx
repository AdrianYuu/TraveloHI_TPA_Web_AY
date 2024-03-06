import styled from "@emotion/styled";
import Sidebar from "../../../components/sidebar";
import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SelectInputForm from "./../../../components/select-input-form";
import { IRoomFacility } from "../../../interfaces/room-facility-interface";
import { getRoomFacilities } from "../../../api/api-room-facilities";
import { getHotels } from "../../../api/api-hotel";
import { getRoomTypes } from "../../../api/api-room-type";
import InputForm from "../../../components/input-form";
import FileInputForm from "../../../components/file-input-form";
import { IRoom } from "../../../interfaces/room-interface";
import { createRoom } from "../../../api/api-room";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase";
import { IRoomPicture } from "../../../interfaces/room-picture-interface";
import { createRoomPicture } from "../../../api/api-room-picture";
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

const RoomForm = styled.form`
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
  margin-bottom: 1rem;
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

const Table = styled.table`
  width: 100%;
  border: 1px solid #ddd;
  margin-top: 0.5rem;
`;

const Th = styled.th`
  padding: 8px;
  text-align: left;
`;

const ThSelect = styled.th`
  padding: 8px;
  text-align: left;
  width: 1rem;
`;

const Tr = styled.tr`
  &::nth-of-type(even) {
    background-color: #f2f2f2;
  }
  height: 100%;
`;

const TableCell = styled.td`
  padding: 8px;
`;

const CheckboxCell = styled.td`
  display: flex;
  justify-content: center;
`;

const RoomFacilityContainer = styled.div`
  width: 100%;
`;

const Thead = styled.thead``;

const Tbody = styled.tbody``;

const Checkbox = styled.input``;

const Label = styled.p`
  font-size: 1rem;
  color: #687279;
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
  max-height: 2rem;

  &:hover {
    background-color: #d63031;
  }
`;

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const PreviewOuterContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const PreviewPicture = styled.img`
  width: 12rem;
  height: 12rem;
  border: 0.1px solid grey;
`;

const AdminCreateRoomPage = () => {
  const navigate = useNavigate();

  const [price, setPrice] = useState<string>("");
  const [hotelID, setHotelID] = useState<number>(0);
  const [hotelOptions, setHotelOptions] = useState<
    { id: number; value: string }[]
  >([]);
  const [roomTypeID, setRoomTypeID] = useState<number>(0);
  const [roomTypeOptions, setRoomTypeOptions] = useState<
    { id: number; value: string }[]
  >([]);
  const [roomFacilities, setRoomFacilities] = useState<IRoomFacility[] | null>(
    null
  );
  const [selectedFacilities, setSelectedFacilities] = useState<IRoomFacility[]>(
    []
  );
  const [roomPictures, setRoomPictures] = useState<File[]>([]);
  const [pictureURLs, setPictureURLs] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  const handleFileInputChange = (file: File | null) => {
    if (file) {
      setRoomPictures((prevPictures) => [...prevPictures, file]);
      setPictureURLs((prevURLs) => [...prevURLs, URL.createObjectURL(file)]);
    }
  };

  const handleRemovePicture = (index: number) => {
    const updatedPictures = [...roomPictures];
    updatedPictures.splice(index, 1);
    setRoomPictures(updatedPictures);

    const updatedURLs = [...pictureURLs];
    updatedURLs.splice(index, 1);
    setPictureURLs(updatedURLs);
  };

  useEffect(() => {
    const fetchRoomTypes = async () => {
      const roomTypes = await getRoomTypes();
      const roomTypesOptions = roomTypes?.map((type) => ({
        id: type.ID !== undefined ? type.ID : -1,
        value: type.RoomTypeName,
      }));
      setRoomTypeOptions(roomTypesOptions ?? []);
    };

    const fetchHotels = async () => {
      const hotels = await getHotels();
      const hotelOptions = hotels?.map((hotel) => ({
        id: hotel.ID !== undefined ? hotel.ID : -1,
        value: hotel.HotelName,
      }));
      setHotelOptions(hotelOptions ?? []);
    };

    const fetchRoomFacilities = async () => {
      setRoomFacilities(await getRoomFacilities());
    };

    fetchRoomTypes();
    fetchHotels();
    fetchRoomFacilities();
  }, []);

  const handleFacilitySelection = (facility: IRoomFacility) => {
    if (isSelected(facility)) {
      setSelectedFacilities((prevFacilities) =>
        prevFacilities.filter((selected) => selected.ID !== facility.ID)
      );
    } else {
      setSelectedFacilities((prevFacilities) => [...prevFacilities, facility]);
    }
  };

  const isSelected = (facility: IRoomFacility) =>
    selectedFacilities.some((selected) => selected.ID === facility.ID);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const Room: IRoom = {
      RoomPrice: price,
      HotelID: hotelID,
      RoomTypeID: roomTypeID,
      RoomFacilities: selectedFacilities,
      RoomPictureLength: roomPictures.length,
    };

    const response = await createRoom(Room);

    if (response?.StatusCode === HttpStatusCode.Ok) {
      const RoomID = response.Message;

      if (RoomID != null) {
        const uploadPictures = roomPictures.map(async (file) => {
          const fileName = Date.now() + "_" + file.name;
          const storageRef = ref(storage, "RoomPictures/" + fileName);
          await uploadBytes(storageRef, file);
          return getDownloadURL(storageRef);
        });

        const uploadedPictureURLs = await Promise.all(uploadPictures);

        const createRoomPicturePromises = uploadedPictureURLs.map(
          async (url) => {
            const RoomPicture: IRoomPicture = {
              RoomID: parseInt(RoomID),
              URL: url,
            };

            createRoomPicture(RoomPicture);
          }
        );

        await Promise.all(createRoomPicturePromises);

        navigate("/admin/view-room");
      }
    } else {
      setError(response?.Message ?? "Error.");
    }
  };

  return (
    <Container>
      <InnerContainer>
        <Sidebar currentpath="/admin/view-room" />
        <FormContainer>
          <FormTitle>Create Room</FormTitle>
          <RoomForm onSubmit={handleSubmit}>
            <SelectInputForm
              label="Hotel"
              options={hotelOptions}
              value={hotelID.toString()}
              onChange={(value) => setHotelID(parseInt(value, 10))}
            />
            <SelectInputForm
              label="Room Type"
              options={roomTypeOptions}
              value={roomTypeID.toString()}
              onChange={(value) => setRoomTypeID(parseInt(value, 10))}
            />
            <InputForm
              label="Room Price"
              type="text"
              value={price}
              onChange={(value) => setPrice(value)}
            />
            {roomFacilities && roomFacilities.length > 0 && (
              <RoomFacilityContainer>
                <Label>Room Facility</Label>
                <Table>
                  <Thead>
                    <Tr>
                      <ThSelect>Select</ThSelect>
                      <Th>Facility Name</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {roomFacilities?.map((facility, index) => (
                      <Tr key={index}>
                        <CheckboxCell>
                          <Checkbox
                            type="checkbox"
                            id={`facility-${facility.ID}`}
                            checked={isSelected(facility)}
                            onChange={() => handleFacilitySelection(facility)}
                          />
                        </CheckboxCell>
                        <TableCell>{facility.FacilityName}</TableCell>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </RoomFacilityContainer>
            )}
            <FileInputForm
              label="Room Picture"
              value={roomPictures[roomPictures.length]}
              onChange={handleFileInputChange}
            />
            <PreviewOuterContainer>
              {roomPictures.map((_, index) => (
                <PreviewContainer key={index}>
                  <PreviewPicture src={pictureURLs[index]} />
                  <RemoveButton
                    type="button"
                    onClick={() => handleRemovePicture(index)}
                  >
                    Remove
                  </RemoveButton>
                </PreviewContainer>
              ))}
            </PreviewOuterContainer>
            <ErrorMessage>{error}</ErrorMessage>
            <ButtonContainer>
              <Button type="submit">Create</Button>
              <BackLink to="/admin/view-room">Back</BackLink>
            </ButtonContainer>
          </RoomForm>
        </FormContainer>
      </InnerContainer>
    </Container>
  );
};

export default AdminCreateRoomPage;
