import React from "react";
import "./FormButton.css";

interface FormButtonProps{
    label: string;
    name: string;
    onClick?: () => void;
}

export function FormButton({
    label,
    name,
    onClick
}:FormButtonProps){
    return(
        <button 
            type="submit" 
            className="form-submit"  
            onClick={onClick}
            data-testid={name}
        >{label}</button>
    );
}
