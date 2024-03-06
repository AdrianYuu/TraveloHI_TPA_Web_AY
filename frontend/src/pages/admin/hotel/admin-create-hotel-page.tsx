import styled from "@emotion/styled";
import Sidebar from "../../../components/sidebar";
import { FormEvent, useEffect, useState } from "react";
import InputForm from "../../../components/input-form";
import FileInputForm from "../../../components/file-input-form";
import { storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";
import { IHotel } from "../../../interfaces/hotel-interface";
import { createHotel } from "../../../api/api-hotel";
import { IHotelPicture } from "../../../interfaces/hotel-picture-interface";
import { createHotelPicture } from "../../../api/api-hotel-picture";
import { IHotelFacility } from "../../../interfaces/hotel-facility-interface";
import { getHotelFacilities } from "../../../api/api-hotel-facilities";
import { HttpStatusCode } from "axios";
import { getCountries } from "../../../api/api-country";
import { ICountry } from "../../../interfaces/country-interface";

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

const HotelForm = styled.form`
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
  &:nth-child(even) {
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

const HotelFacilityContainer = styled.div`
  width: 100%;
`;

const Thead = styled.thead``;

const Tbody = styled.tbody``;

const Checkbox = styled.input``;

const Label = styled.p`
  font-size: 1rem;
  color: #687279;
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const Select = styled.select`
  border-radius: 0.2rem;
  border: 1px solid #d0d4d4;
  padding: 0.5rem 0.4rem;
  color: black;
  font-size: 1rem;

  &:focus {
    outline: 1px solid #0ca8e8;
  }
`;

const AdminCreateHotelPage = () => {
  const navigate = useNavigate();

  const [hotelFacilities, setHotelFacilities] = useState<
    IHotelFacility[] | null
  >(null);

  const [selectedFacilities, setSelectedFacilities] = useState<
    IHotelFacility[]
  >([]);

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [hotelPictures, setHotelPictures] = useState<File[]>([]);
  const [pictureURLs, setPictureURLs] = useState<string[]>([]);
  const [star, setStar] = useState<string>("");
  const [countries, setCountries] = useState<ICountry[] | null>(null);
  const [selectedCountryId, setSelectedCountryId] = useState<number>(1);

  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchHotelFacilities = async () => {
      setHotelFacilities(await getHotelFacilities());
    };

    fetchHotelFacilities();
  }, []);

  const handleFacilitySelection = (facility: IHotelFacility) => {
    if (isSelected(facility)) {
      setSelectedFacilities((prevFacilities) =>
        prevFacilities.filter((selected) => selected.ID !== facility.ID)
      );
    } else {
      setSelectedFacilities((prevFacilities) => [...prevFacilities, facility]);
    }
  };

  const isSelected = (facility: IHotelFacility) =>
    selectedFacilities.some((selected) => selected.ID === facility.ID);

  useEffect(() => {
    const fetchCountries = async () => {
      const countriesData = await getCountries();
      if (countriesData) {
        setCountries(countriesData);
      }
    };

    fetchCountries();
  }, []);

  const handleFileInputChange = (file: File | null) => {
    if (file) {
      setHotelPictures((prevPictures) => [...prevPictures, file]);
      setPictureURLs((prevURLs) => [...prevURLs, URL.createObjectURL(file)]);
    }
  };

  const handleRemovePicture = (index: number) => {
    const updatedPictures = [...hotelPictures];
    updatedPictures.splice(index, 1);
    setHotelPictures(updatedPictures);

    const updatedURLs = [...pictureURLs];
    updatedURLs.splice(index, 1);
    setPictureURLs(updatedURLs);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const Hotel: IHotel = {
      HotelName: name,
      HotelDescription: description,
      HotelAddress: address,
      HotelFacilities: selectedFacilities,
      HotelPictureLength: hotelPictures.length,
      HotelStar: star,
      CountryID: selectedCountryId,
    };

    const response = await createHotel(Hotel);
    if (response?.StatusCode === HttpStatusCode.Ok) {
      const HotelID = parseInt(response.Message);

      if (HotelID != null) {
        const uploadPictures = hotelPictures.map(async (file) => {
          const fileName = Date.now() + "_" + file.name;
          const storageRef = ref(storage, "HotelPictures/" + fileName);
          await uploadBytes(storageRef, file);
          return getDownloadURL(storageRef);
        });

        const uploadedPictureURLs = await Promise.all(uploadPictures);

        const createHotelPicturePromises = uploadedPictureURLs.map(
          async (url) => {
            const HotelPicture: IHotelPicture = {
              HotelID: HotelID,
              URL: url,
            };

            createHotelPicture(HotelPicture);
          }
        );

        await Promise.all(createHotelPicturePromises);
        navigate("/admin/view-hotel");
      }
    } else {
      setError(response?.Message ?? "Error");
    }
  };

  return (
    <Container>
      <InnerContainer>
        <Sidebar currentpath="/admin/view-hotel" />
        <FormContainer>
          <FormTitle>Create Hotel</FormTitle>
          <HotelForm onSubmit={handleSubmit}>
            <InputForm
              label="Hotel Name"
              type="text"
              value={name}
              onChange={(value) => setName(value)}
            />
            <InputForm
              label="Hotel Description"
              type="text"
              value={description}
              onChange={(value) => setDescription(value)}
            />
            <InputForm
              label="Hotel Address"
              type="text"
              value={address}
              onChange={(value) => setAddress(value)}
            />
            <InputForm
              label="Hotel Star"
              type="text"
              value={star}
              onChange={(value) => setStar(value)}
            />
            <SelectContainer>
              <Label>Hotel Country</Label>
              <Select
                value={selectedCountryId}
                onChange={(e) => setSelectedCountryId(parseInt(e.target.value))}
              >
                {countries &&
                  countries.map((country) => (
                    <option key={country.ID} value={country.ID}>
                      {country.CountryName}
                    </option>
                  ))}
              </Select>
            </SelectContainer>
            {hotelFacilities && hotelFacilities.length > 0 && (
              <HotelFacilityContainer>
                <Label>Hotel Facility</Label>
                <Table>
                  <Thead>
                    <Tr>
                      <ThSelect>Select</ThSelect>
                      <Th>Facility Name</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {hotelFacilities.map((facility, index) => (
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
              </HotelFacilityContainer>
            )}
            <FileInputForm
              label="Hotel Picture"
              value={hotelPictures[hotelPictures.length]}
              onChange={handleFileInputChange}
            />
            <PreviewOuterContainer>
              {hotelPictures.map((_, index) => (
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
              <BackLink to="/admin/view-hotel">Back</BackLink>
            </ButtonContainer>
          </HotelForm>
        </FormContainer>
      </InnerContainer>
    </Container>
  );
};

export default AdminCreateHotelPage;
