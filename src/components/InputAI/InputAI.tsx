import React, { useState } from "react";
import {
  InputContainer,
  Button,
  ErrorMessage,
  ErrorMessageContainer,
  IconSpan,
  StyledInput,
} from "./components";
import { FaHandSparkles } from "react-icons/fa";

interface InputAIProps {
  value: string;
  onChange(newValue: string): void;
  onSubmitAdd?(newValue: string): void;
  onSubmitAI?(newValue: string): void;
  placeHolder?: string;
}

export const InputAI: React.FC<InputAIProps> = ({
  value,
  onChange,
  placeHolder,
  onSubmitAdd,
  onSubmitAI,
}) => {
  const [isValid, setIsValid] = useState(true);

  const handleInputBlur = () => {
    setIsValid(true);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value) {
      onSubmitAdd && onSubmitAdd(value);
    } else {
      validateInput(value);
    }
  };

  const handleSubmit = (submitFunction?: (newValue: string) => void) => {
    if (value) {
      submitFunction && submitFunction(value);
    } else {
      validateInput(value);
    }
  };

  const validateInput = (value: string) => {
    setIsValid(value.trim() !== "");
  };

  return (
    <InputContainer>
      <ErrorMessageContainer>
        <StyledInput
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            validateInput(e.target.value);
          }}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          aria-label="Enter a text for create a todo list"
          placeholder={placeHolder}
        />
        {!isValid && <ErrorMessage>Input cannot be empty</ErrorMessage>}
      </ErrorMessageContainer>

      <Button
        aria-label="Add a todo list"
        onClick={() => handleSubmit(onSubmitAdd)}
      >
        Add
      </Button>
      <Button
        aria-label="Submit with AI"
        onClick={() => handleSubmit(onSubmitAI)}
      >
        {" "}
        <IconSpan>
          <FaHandSparkles />
        </IconSpan>
      </Button>
    </InputContainer>
  );
};
