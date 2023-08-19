import { useState } from "react";

import "./RadioButton.css";

type Option = {
  value: string;
  label: string;
  default?: boolean;
};

interface RadioButtonProps {
  /**
   * Array of options to display?
   */
  options: Option[];
  /**
   * on change click handler, it return the selected option.
   */
  onChange?: (selectedOption: string) => void;
}

/**
 * Primary UI component for user interaction
 */
export const RadioButton: React.FC<RadioButtonProps> = ({onChange,options}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(options.find((option)=> option.default)?.value ?? null);

  const handleOptionChange = (optionValue: string) => {
    setSelectedOption(optionValue);
    onChange && onChange(optionValue);
  };

  return (
    <fieldset className="radio-button">
      {options.map((option) => (
        <div key={option.value}>
          <input
            type="radio"
            id={option.value}
            name="optionGroup"
            value={option.value}
            checked={selectedOption === option.value}
            onChange={() => handleOptionChange(option.value)}
          />
          <label htmlFor={option.value}>{option.label}</label>
        </div>
      ))}
    </fieldset>
  );
};
