import React from "react";
import CalculatorFormView from "./CalculatorFormView";
import useDeliveryFeeForm from "../../hooks/useDeliveryFeeForm/useDeliveryFeeForm";

export function CalculatorFormContainer() {
  const {
    onChangeCartValue,
    onChangeDistance,
    onChangeItemCount,
    onChangeDeliveryDate,
    deliveryPrice,
    calculateDeliveryPrice,
    onFormSubmit,
  } = useDeliveryFeeForm();

  return (
    <CalculatorFormView
      onChangeCartValue={onChangeCartValue}
      onChangeDistance={onChangeDistance}
      onChangeItemCount={onChangeItemCount}
      onChangeDeliveryDate={onChangeDeliveryDate}
      deliveryPrice={deliveryPrice}
      calculateDelivery={calculateDeliveryPrice}
      currency={"€"}
      onFormSubmit={onFormSubmit}
    />
  );
}