import React, { useState, ChangeEvent } from "react";
import styled from "@emotion/styled";
import FileIcon from "../assets/File_Icon.png";

interface IFileInputForm {
  label: string;
  value: File | null;
  onChange: (file: File | null) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #687279;
`;

const FileInputContainer = styled.label`
  cursor: pointer;
  border-radius: 0.2rem;
  border: 1px solid #d0d4d4;
  padding: 0.5rem 0.4rem;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const FileLogo = styled.img`
  width: 20px;
  height: 20px;
`;

const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Placeholder = styled.p``;

const FileInputForm: React.FC<IFileInputForm> = ({ label, onChange }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
      onChange(selectedFile);
    } else {
      setFile(null);
      onChange(null);
    }
  };

  return (
    <Container>
      <Label>{label}</Label>
      <FileInputContainer>
        <HiddenFileInput
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => handleFileChange(e)}
        />
        <InnerContainer>
          <FileLogo src={FileIcon} />
          {file ? (
            <Placeholder>{file.name}</Placeholder>
          ) : (
            <Placeholder>Insert a picture...</Placeholder>
          )}
        </InnerContainer>
      </FileInputContainer>
    </Container>
  );
};

export default FileInputForm;
