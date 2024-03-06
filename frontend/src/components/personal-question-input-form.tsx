import styled from "@emotion/styled";
import { IPersonalQuestion } from "./../interfaces/personal-question.d";
import { useEffect, useState } from "react";
import { getPersonalQuestions } from "../api/api-personal-question-answer";

interface IPersonalQuestionInputForm {
  label: string;
  questions: { id: number; question: string; answer: string }[];
  onAddQuestion: () => void;
  onRemoveQuestion: (id: number) => void;
  onQuestionChange: (id: number, question: string) => void;
  onAnswerChange: (id: number, answer: string) => void;
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

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  margin-bottom: 0.3rem;
`;

const InnerQuestionContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 0.5rem;
`;

const Select = styled.select`
  border-radius: 0.2rem;
  border: 1px solid #d0d4d4;
  padding: 0.4rem;
  color: black;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;

  &:focus {
    outline: 1px solid #0ca8e8;
  }
`;

const Answer = styled.input`
  border-radius: 0.2rem;
  border: 1px solid #d0d4d4;
  padding: 0.5rem;
  color: black;
  font-size: 1rem;

  &:focus {
    outline: 1px solid #0ca8e8;
  }
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

  &:hover {
    background-color: #d63031;
  }
`;

const AddButton = styled.button`
  background-color: #2074f4;
  color: white;
  border: none;
  border-radius: 0.2rem;
  padding: 0.5rem;
  height: 2.2rem;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  width: 10%;

  &:hover {
    background-color: #086cdc;
  }
`;

const PersonalQuestionInputForm: React.FC<IPersonalQuestionInputForm> = ({
  label,
  questions,
  onAddQuestion,
  onRemoveQuestion,
  onQuestionChange,
  onAnswerChange,
}) => {
  const [personalQuestions, setPersonalQuestions] = useState<
    IPersonalQuestion[] | null
  >(null);

  useEffect(() => {
    const fetchData = async () => {
      setPersonalQuestions(await getPersonalQuestions());
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Label>{label}</Label>
      {questions.map((question) => (
        <QuestionContainer key={question.id}>
          <InnerQuestionContainer>
            <Select
              value={question.question}
              onChange={(e) => onQuestionChange(question.id, e.target.value)}
            >
              {personalQuestions &&
                personalQuestions.map((option) => (
                  <option key={option.ID} value={option.ID}>
                    {option.Question}
                  </option>
                ))}
            </Select>
            {questions.length > 1 ? (
              <RemoveButton
                onClick={() => onRemoveQuestion(question.id)}
                type="button"
              >
                Remove
              </RemoveButton>
            ) : (
              <RemoveButton disabled>Remove</RemoveButton>
            )}
          </InnerQuestionContainer>
          <Answer
            type="text"
            value={question.answer}
            onChange={(e) => onAnswerChange(question.id, e.target.value)}
            placeholder="Answer"
          />
        </QuestionContainer>
      ))}
      {questions.length < 5 && (
        <AddButton onClick={onAddQuestion} type="button">
          Add
        </AddButton>
      )}
    </Container>
  );
};

export default PersonalQuestionInputForm;
