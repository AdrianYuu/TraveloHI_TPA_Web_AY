import styled from "@emotion/styled";

interface IInputForm {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
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

const Input = styled.input`
  border-radius: 0.2rem;
  border: 1px solid #d0d4d4;
  padding: 0.5rem 0.4rem;
  color: black;
  font-size: 1rem;

  &:focus {
    outline: 1px solid #0ca8e8;
  }
`;

const InputForm: React.FC<IInputForm> = ({
  label,
  type,
  value,
  onChange,
  disabled,
}) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
    </Container>
  );
};

export default InputForm;
