import React from "react";
import "./CalculatorForm.css";
import { 
  NumberInput,
  DateInput,
  FormButton,
  DeliveryPrice,
} from "../../components";

interface CalculatorFormViewProps {
  onChangeCartValue: (value: number) => void;
  onChangeDistance: (distance: number) => void;
  onChangeItemCount: (count: number) => void;
  onChangeDeliveryDate: (date: Date) => void;
  deliveryPrice: number;
  calculateDelivery: () => void;
  currency: String;
  onFormSubmit: (event: any) => void;
}

function CalculatorFormView({
  onChangeCartValue,
  onChangeDistance,
  onChangeItemCount,
  onChangeDeliveryDate,
  deliveryPrice,
  calculateDelivery,
  currency,
  onFormSubmit,
}: CalculatorFormViewProps) {
  return (
    <div className="calculator-form-view">
      <div className="form-container">
        <div className="form-header">
          <span>Delivery Fee Calculator</span>
        </div>
        <form className="calculator-form" onSubmit={onFormSubmit}>
          <NumberInput 
            name={"cartValue"}
            inputLabel={'Cart Value'}
            placeholder={"0.00"} 
            measurementUnit={currency}
            onChangeInputValue={onChangeCartValue}
          />
          <NumberInput
            name={"deliveryDistance"}
            inputLabel={'Delivery distance'}
            placeholder={"0.0"} 
            measurementUnit={"m"}
            onChangeInputValue={onChangeDistance}
          />
          <NumberInput
            name={"numberofItems"}
            inputLabel={'Amount of items'}
            placeholder={"0"} 
            onChangeInputValue={onChangeItemCount}
          />
          <DateInput 
            inputLabel="Time"
            name={"deliveryDate"}
            onChangeDateValue={onChangeDeliveryDate}
          />
          <FormButton 
            label={"Calculate Delivery Price"} 
            name={"calculatePriceButton"}
            onClick={calculateDelivery}
          />
        </form>
        <DeliveryPrice currency={currency} price={deliveryPrice} />
        <div className="form-footer"></div>
      </div> 
    </div>
  );
}
  
export default CalculatorFormView;