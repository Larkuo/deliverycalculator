import React from "react";
import "./NumberInput.css";

interface NumberInputProps {
    name: string;
    inputLabel: String;
    placeholder?: string;
    allowNegatives?: boolean;
    measurementUnit?: String;
    onChangeInputValue: (value: number) => void;
}

export function NumberInput({
    name,
    inputLabel,
    placeholder = "0",
    allowNegatives = false,
    measurementUnit,
    onChangeInputValue,
}: NumberInputProps){

    return(
        <label className="input-label" id={name} data-testid={name}>
            <span className="input-name">{inputLabel}</span>
            {allowNegatives?
                <input
                    name={name}
                    className="number-input"
                    type="number"
                    onChange={(e) => {
                        onChangeInputValue && onChangeInputValue(Number(e.target.value));
                    }}
                    placeholder={placeholder}
                /> 
                :
                <input
                    name={name}
                    className="number-input"
                    type="number"
                    onChange={(e) => {
                        onChangeInputValue(Number(e.target.value));
                    }}
                    min="0"
                    placeholder={placeholder}
                />
            }
            <div className="measurement-unit"><span>{measurementUnit}</span></div>
        </label>
    );
}
