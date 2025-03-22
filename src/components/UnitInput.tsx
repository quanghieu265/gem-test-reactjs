import React, { useState } from "react";
import styles from "./UnitInput.module.css";

interface UnitInputProps {
  defaultUnit?: "px" | "%";
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
}

const UnitInput: React.FC<UnitInputProps> = ({
  defaultUnit = "%",
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 0
}) => {
  const [unit, setUnit] = useState<"px" | "%">(defaultUnit);
  const [value, setValue] = useState<number>(defaultValue);

  const handleIncrement = () => {
    if (unit === "%" && value >= max) return;
    const newValue = unit === "%" ? Math.min(value + step, max) : value + step;
    setValue(newValue);
  };

  const handleDecrement = () => {
    if (value <= min) return;
    const newValue = Math.max(value - step, min);
    setValue(newValue);
  };

  const handleUnitChange = (newUnit: "px" | "%") => {
    setUnit(newUnit);
    let newValue = value;

    if (newUnit === "%" && value > 100) {
      newValue = 100;
    }

    setValue(newValue);
  };

  const sanitizeInput = (input: string): string => {
    // Replace comma with dot
    let sanitized = input.replace(/,/g, ".");

    // Remove non-numeric characters except dot
    sanitized = sanitized.replace(/[^\d.]/g, "");

    // Ensure only one decimal point
    const parts = sanitized.split(".");
    if (parts.length > 2) {
      sanitized = parts[0] + "." + parts.slice(1).join("");
    }

    return sanitized;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeInput(e.target.value);
    const numericValue = parseFloat(sanitized);

    if (!isNaN(numericValue)) {
      if (unit === "%" && numericValue > 100) {
        setValue(100);
      } else if (numericValue < min) {
        setValue(min);
      } else {
        setValue(numericValue);
      }
    }
  };

  const handleBlur = () => {
    if (unit === "%" && value > 100) {
      setValue(100);
    } else if (value < min) {
      setValue(min);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  const isDecrementDisabled = value <= min;
  const isIncrementDisabled = unit === "%" && value >= 100;

  return (
    <div className="w-full flex flex-col gap-6 p-4 rounded-lg w-48">
      <div className="flex items-center justify-between">
        <span className="text-neutral-300 text-sm">Unit</span>
        <div className="flex bg-neutral-800 rounded-md w-[50%] p-[2px]">
          <button
            className={`w-[50%] px-3 py-1 rounded-md text-sm transition-colors ${
              unit === "%"
                ? "bg-neutral-600 text-white"
                : "text-neutral-400 hover:text-white"
            }`}
            onClick={() => handleUnitChange("%")}
          >
            %
          </button>
          <button
            className={`w-[50%] px-3 py-1 rounded-md text-sm transition-colors ${
              unit === "px"
                ? "bg-neutral-600 text-white"
                : "text-neutral-400 hover:text-white"
            }`}
            onClick={() => handleUnitChange("px")}
          >
            px
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-neutral-300 text-sm">Value</span>

        <div
          className={`flex items-center justify-between bg-neutral-800 rounded-md w-[50%] p-[2px] transition-colors ${styles.parent}`}
        >
          <button
            className={`px-3 py-1 transition-colors rounded-l-md relative group ${
              isDecrementDisabled
                ? "text-neutral-600 bg-neutral-900 cursor-not-allowed"
                : "text-neutral-400 hover:text-white hover:bg-neutral-700 active:bg-neutral-600 active:text-white"
            }`}
            onClick={handleDecrement}
            disabled={isDecrementDisabled}
          >
            -
            {isDecrementDisabled && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-neutral-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                Value must greater than 0
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-neutral-800"></div>
              </div>
            )}
          </button>

          <input
            type="text"
            value={value}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={`w-8 bg-transparent text-center text-white text-sm focus:outline-none ${styles.child}`}
          />

          <button
            className={`px-3 py-1 transition-colors rounded-r-md relative group  ${
              isIncrementDisabled
                ? "text-neutral-600 bg-neutral-900 cursor-not-allowed"
                : "text-neutral-400 hover:text-white hover:bg-neutral-700 active:bg-neutral-600 active:text-white"
            }`}
            onClick={handleIncrement}
            disabled={isIncrementDisabled}
          >
            +
            {isIncrementDisabled && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-neutral-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                Value must smaller than 100
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-neutral-800"></div>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnitInput;
