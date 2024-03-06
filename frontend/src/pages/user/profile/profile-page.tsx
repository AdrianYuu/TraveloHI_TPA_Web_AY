import styled from "@emotion/styled";
import Navbar from "../../../components/navbar";
import useUser from "../../../contexts/user-context";
import { Link, useNavigate } from "react-router-dom";
import PointIcon from "../../../assets/Point_Icon.png";
import CardIcon from "../../../assets/Card_Icon.png";
import SettingsIcon from "../../../assets/Settings_Icon.png";
import LogoutIcon from "../../../assets/Logout_Icon.png";
import { FormEvent, useEffect, useState } from "react";
import InputForm from "../../../components/input-form";
import SelectInputForm from "../../../components/select-input-form";
import FileInputForm from "../../../components/file-input-form";
import CheckboxInputForm from "../../../components/checkbox-input-form";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase";
import { IUser } from "../../../interfaces/user-interface";
import { updateUser } from "../../../api/api-user";
import Footer from "../../../components/footer";
import WalletIcon from "../../../assets/Wallet_Icon.png";
import { HttpStatusCode } from "axios";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f7f9fa;
`;

const InnerContainer = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
`;

const ProfileContainer = styled.div`
  display: flex;
  width: 55rem;
  margin-top: 2rem;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const LeftContainer = styled.div`
  border: 1px solid #e1e3e3;
  border-radius: 1rem;
  width: 35%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
`;

const RightContainer = styled.div`
  width: 65%;
  border: 1px solid #e1e3e3;
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const PictureSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Picture = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
`;

const Information = styled.p`
  font-weight: 600;
  font-size: 1rem;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const NavLink = styled(Link)`
  font-weight: 600;
  font-size: 0.9rem;
  color: #687279;
`;

const Icon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

const SectionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LineBreak = styled.div`
  background-color: #e1e3e3;
  height: 0.1rem;
  margin-bottom: 1rem;
`;

const AccountForm = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
`;

const FormContainer = styled.div`
  height: 100%;
  padding: 0.5rem;
`;

const FormTitle = styled.p`
  font-size: 1rem;
  font-weight: 600;
`;

const InputContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
`;

const SubmitButton = styled.button`
  background-color: white;
  border: 1px solid #0ca8e8;
  border-radius: 0.2rem;
  color: #0ca8e8;
  padding: 0.5rem;
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
  text-align: center;
  font-weight: 600;
  font-size: 1rem;
  color: red;
  min-height: 1rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

const PreviewImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const PreviewImage = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 6rem;
  border: 0.1px solid grey;
`;

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout, refetchUser } = useUser();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePictureURL, setProfilePictureURL] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const [error, setError] = useState<string>("");

  const genderOptions = ["Male", "Female"];

  const handleLogout = () => {
    logout(user?.ID ?? 0);
    navigate("/");
  };

  const handleProfilePicture = async () => {
    if (profilePicture) {
      const fileName = Date.now() + "_" + profilePicture.name;
      const storageRef = ref(storage, "ProfilePicture/" + fileName);
      await uploadBytes(storageRef, profilePicture);
      setProfilePictureURL(await getDownloadURL(storageRef));
    }
  };

  const handleFileInputChange = (file: File | null) => {
    setProfilePicture(file);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    await handleProfilePicture();

    const User: IUser = {
      ID: user?.ID,
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      DateOfBirth: date,
      Gender: gender,
      Password: user?.Password,
      ProfilePictureURL: profilePictureURL,
      RoleID: 2,
      IsBanned: false,
      IsSubscribed: checked,
      Points: user?.Points,
      WalletBalance: user?.WalletBalance,
      PhoneNumber: phoneNumber,
      Address: address,
    };

    const response = await updateUser(User);

    if (response?.StatusCode === HttpStatusCode.Ok) {
      await refetchUser();
    } else {
      setError(response?.Message ?? "Error");
    }
  };

  const fillData = () => {
    if (!user) return;
    setFirstName(user?.FirstName);
    setLastName(user?.LastName);
    setEmail(user?.Email);
    setDate(user?.DateOfBirth);
    setGender(user?.Gender);
    setChecked(user?.IsSubscribed);
    setAddress(user?.Address ?? "");
    setPhoneNumber(user?.PhoneNumber ?? "");
    setProfilePictureURL(user?.ProfilePictureURL);
  };

  useEffect(() => {
    fillData();
  }, []);

  return (
    <Container>
      <Navbar />
      <InnerContainer>
        <ProfileContainer>
          <LeftContainer>
            <PictureSection>
              <Picture src={user?.ProfilePictureURL} />
              <Information>
                {user?.FirstName} {user?.LastName}
              </Information>
            </PictureSection>
            <LineBreak />
            <Section>
              <SectionContainer>
                <Icon src={PointIcon} />
                <NavLink to="/view-point">My Point</NavLink>
              </SectionContainer>
              <SectionContainer>
                <Icon src={CardIcon} />
                <NavLink to="/view-credit-card">My Card</NavLink>
              </SectionContainer>
              <SectionContainer>
                <Icon src={WalletIcon} />
                <NavLink to="/view-wallet">HI Wallet</NavLink>
              </SectionContainer>
            </Section>
            <LineBreak />
            <Section>
              <SectionContainer>
                <Icon src={SettingsIcon} />
                <NavLink to="/view-profile">My Account</NavLink>
              </SectionContainer>
              <SectionContainer>
                <Icon src={LogoutIcon} />
                <NavLink to="/" onClick={handleLogout}>
                  Log out
                </NavLink>
              </SectionContainer>
            </Section>
          </LeftContainer>
          <RightContainer>
            <FormContainer>
              <AccountForm onSubmit={handleSubmit}>
                <FormTitle>Personal Information</FormTitle>
                <PreviewImageContainer>
                  {profilePicture ? (
                    <PreviewImage src={URL.createObjectURL(profilePicture)} />
                  ) : (
                    <PreviewImage src={user?.ProfilePictureURL} />
                  )}
                </PreviewImageContainer>
                <InputContainer>
                  <InputForm
                    label="First Name"
                    type="text"
                    value={firstName}
                    onChange={(value) => setFirstName(value)}
                  />
                  <InputForm
                    label="Last Name"
                    type="text"
                    value={lastName}
                    onChange={(value) => setLastName(value)}
                  />
                </InputContainer>
                <InputForm
                  label="Email"
                  type="text"
                  value={email}
                  onChange={(value) => setEmail(value)}
                />
                <InputForm
                  label="Date Of Birth"
                  type="date"
                  value={date}
                  onChange={(value) => setDate(value)}
                />
                <SelectInputForm
                  label="Gender"
                  options={genderOptions}
                  value={gender}
                  onChange={(value) => setGender(value)}
                />
                <InputForm
                  label="Address"
                  type="text"
                  value={address}
                  onChange={(value) => setAddress(value)}
                />
                <InputForm
                  label="Phone Number"
                  type="text"
                  value={phoneNumber}
                  onChange={(value) => setPhoneNumber(value)}
                />
                <FileInputForm
                  label="Profile Picture"
                  value={profilePicture}
                  onChange={handleFileInputChange}
                />
                <CheckboxInputForm
                  label="I agree to subscribe to the news letter"
                  checked={checked}
                  onChange={(value) => setChecked(value)}
                />
                <ErrorMessage>{error}</ErrorMessage>
                <SubmitButton type="submit">Update</SubmitButton>
              </AccountForm>
            </FormContainer>
          </RightContainer>
        </ProfileContainer>
      </InnerContainer>
      <Footer />
    </Container>
  );
};

export default ProfilePage;
