import React from 'react';
import { render, screen } from '@testing-library/react';
import CalculatorFormView from './CalculatorFormView';

describe("Testing Delivery Price Calculator Form View", () => {
    test('Renders delivery price calculator form & all form inputs', () => {
        render(
            <CalculatorFormView
                onChangeCartValue={() => {}}
                onChangeDistance={() => {}}
                onChangeItemCount={() => {}}
                onChangeDeliveryDate={() => {}}
                deliveryPrice={10}
                calculateDelivery={() => {}}
                currency={"€"}
                onFormSubmit={() => {}}
            />
        );

        const cartValueInput = screen.getByTestId("cartValue");
        expect(cartValueInput).toBeInTheDocument();

        const deliveryDistanceInput = screen.getByTestId("deliveryDistance");
        expect(deliveryDistanceInput).toBeInTheDocument();

        const itemCountInput = screen.getByTestId("numberofItems");
        expect(itemCountInput).toBeInTheDocument();

        const deliveryDateInput = screen.getByTestId("deliveryDate");
        expect(deliveryDateInput).toBeInTheDocument();
    });

});