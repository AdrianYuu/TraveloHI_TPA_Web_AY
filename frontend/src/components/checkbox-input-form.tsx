import styled from "@emotion/styled";

interface ICheckboxInputForm {
  label: string;
  checked: boolean;
  onChange: (isChecked: boolean) => void;
}

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  font-size: 1rem;
  color: black;
`;

const CheckBox = styled.input`
  margin-right: 0.4rem;
  width: 1rem;
  height: 1rem;
`;

const CheckboxInputForm: React.FC<ICheckboxInputForm> = ({
  label,
  checked,
  onChange,
}) => {
  return (
    <Container>
      <CheckBox
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <Label>{label}</Label>
    </Container>
  );
};

export default CheckboxInputForm;
