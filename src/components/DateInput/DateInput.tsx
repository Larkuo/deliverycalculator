import React from "react";
import { MdCalendarMonth } from "react-icons/md";

import "./DateInput.css";


interface DateInputProps {
    inputLabel: string;
    name: string;
    onChangeDateValue: (date: Date) => void;
}

export function DateInput({
    inputLabel,
    name,
    onChangeDateValue,
}: DateInputProps){
    function formatISODate(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const dateMin = formatISODate(new Date());
    
    return(
        <label className="input-label" data-testid={name}>
            <span className="input-name">{inputLabel}</span>
            <input 
                min={dateMin}
                className="date-input" 
                type="date"
                onChange={(e) => {
                    onChangeDateValue(new Date(e.target.value));
                }}
            />
            <div className="date-icon-div">
                <MdCalendarMonth className="date-icon"/>
            </div>
        </label>
    );
}