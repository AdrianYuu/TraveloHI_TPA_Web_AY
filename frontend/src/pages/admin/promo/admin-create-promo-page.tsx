import styled from "@emotion/styled";
import Sidebar from "../../../components/sidebar";
import { FormEvent, useState } from "react";
import InputForm from "../../../components/input-form";
import SelectInputForm from "./../../../components/select-input-form";
import FileInputForm from "../../../components/file-input-form";
import { createPromo, createPromoFirebase } from "../../../api/api-promo";
import { storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { IPromo } from "../../../interfaces/promo-interface";
import { Link, useNavigate } from "react-router-dom";
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

const PromoForm = styled.form`
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

const AdminCreatePromoPage = () => {
  const navigate = useNavigate();

  const [code, setCode] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [discount, setDiscount] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [finishDate, setFinishDate] = useState<string>("");
  const [promoPicture, setPromoPicture] = useState<File | null>(null);
  const [pictureURL, setPictureURL] = useState<string>("");
  const [error, setError] = useState<string>("");
  const typeOptions = ["Flight Ticket", "Booking Hotel"];

  const handleFileInputChange = (file: File | null) => {
    setPromoPicture(file);
  };

  const handlePicture = async () => {
    if (promoPicture) {
      const fileName = Date.now() + "_" + promoPicture.name;
      const storageRef = ref(storage, "PromoPicture/" + fileName);
      await uploadBytes(storageRef, promoPicture);
      setPictureURL(await getDownloadURL(storageRef));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    await handlePicture();

    const Promo: IPromo = {
      PromoCode: code,
      PromoDescription: description,
      PromoType: type,
      PromoDiscount: discount,
      PromoPictureURL: pictureURL,
      StartDate: startDate.replace("T", " "),
      FinishDate: finishDate.replace("T", " "),
    };

    const response = await createPromo(Promo);

    if (response?.StatusCode === HttpStatusCode.Ok) {
      await createPromoFirebase(Promo);
      navigate("/admin/view-promo");
    } else {
      setError(response?.Message ?? "Error");
    }
  };

  return (
    <Container>
      <InnerContainer>
        <Sidebar currentpath="/admin/view-promo" />
        <FormContainer>
          <FormTitle>Create Promo</FormTitle>
          <PromoForm onSubmit={handleSubmit}>
            <InputForm
              label="Promo Code"
              type="text"
              value={code}
              onChange={(value) => setCode(value)}
            />
            <InputForm
              label="Promo Description"
              type="text"
              value={description}
              onChange={(value) => setDescription(value)}
            />
            <SelectInputForm
              label="Promo Type"
              options={typeOptions}
              value={type}
              onChange={(value) => setType(value)}
            />
            <InputForm
              label="Promo Discount"
              type="text"
              value={discount}
              onChange={(value) => setDiscount(value)}
            />
            <InputForm
              label="Promo Start Date"
              type="datetime-local"
              value={startDate}
              onChange={(value) => setStartDate(value)}
            />
            <InputForm
              label="Promo Finish Date"
              type="datetime-local"
              value={finishDate}
              onChange={(value) => setFinishDate(value)}
            />
            <FileInputForm
              label="Promo Picture"
              value={promoPicture}
              onChange={handleFileInputChange}
            />
            {promoPicture && (
              <PreviewPicture src={URL.createObjectURL(promoPicture)} />
            )}
            <ErrorMessage>{error}</ErrorMessage>
            <ButtonContainer>
              <Button type="submit">Create</Button>
              <BackLink to="/admin/view-promo">Back</BackLink>
            </ButtonContainer>
          </PromoForm>
        </FormContainer>
      </InnerContainer>
    </Container>
  );
};

export default AdminCreatePromoPage;
