import styled from "@emotion/styled";

interface ISelectInputForm {
  label: string;
  options: string[] | { id: number; value: string }[];
  value: string;
  onChange: (value: string) => void;
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

const SelectInputForm: React.FC<ISelectInputForm> = ({
  label,
  options,
  value,
  onChange,
}) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Select value={value} onChange={(e) => onChange(e.target.value)}>
        {typeof options[0] === "string" ? (
          <option value="" disabled>
            Select a value..
          </option>
        ) : (
          <option value="0" disabled>
            Select a value..
          </option>
        )}
        {options.map((option, index) => (
          <option
            key={index}
            value={typeof option === "string" ? option : option.id}
          >
            {typeof option === "string" ? option : option.value}
          </option>
        ))}
      </Select>
    </Container>
  );
};

export default SelectInputForm;
