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

/**
 * Properties for the `InputAI` component.
 */
interface InputAIProps {
  /** The current value of the input. */
  value: string;
  /** Callback function for handling value changes. */
  onChange(newValue: string): void;
  /** Callback function for submitting with the "Add" button. */
  onSubmitAdd?(newValue: string): void;
  /** Callback function for submitting with the "Submit with AI" button. */
  onSubmitAI?(newValue: string): void;
  /** Placeholder text for the input field. */
  placeHolder?: string;
}

/**
 * React component for an input field with "Add" and "Submit with AI" buttons.
 *
 * @component
 */
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
        <IconSpan>
          <FaHandSparkles />
        </IconSpan>
      </Button>
    </InputContainer>
  );
};
