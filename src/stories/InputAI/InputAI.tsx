import React, { useState } from "react";
import { FaHandSparkles } from "react-icons/fa";

import { Button, ErrorMessage, ErrorMessageContainer, IconSpan, InputContainer, StyledInput } from "./components";

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
  /** Indicates whether the input field is disabled or not. */
  disabled?: boolean;
}

/**
 * React component for an input field with "Add" and "Submit with AI" buttons.
 *
 * @component
 */
export const InputAI: React.FC<InputAIProps> = ({
  value,
  disabled,
  placeHolder,
  onChange,
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
          disabled={disabled}
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
        disabled={disabled}
        aria-label="Add a todo list"
        onClick={() => handleSubmit(onSubmitAdd)}
      >
        Add
      </Button>
      <Button
        disabled={disabled}
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
