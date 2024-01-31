import React from 'react';
import { render, screen } from '@testing-library/react';
import { DeliveryPrice } from './DeliveryPrice';

describe("Testing Delivery Price Component", () => {
    test('Renders test delivery price label & value', () => {
        const price: number = 14.50;
        const currency: string = "$";
        const testID: string = "deliveryPriceTest";

        render(
            <DeliveryPrice 
                currency={currency}
                price={price}
                dataTestID={testID} 
            />
        );

        const deliveryPrice = screen.getByTestId(testID);
        expect(deliveryPrice).toBeInTheDocument();

        const deliveryPriceLabel = screen.getByText("Delivery price:");
        expect(deliveryPriceLabel).toBeInTheDocument();

        const deliveryPriceValue = screen.getByTestId("priceValue").textContent;
        expect(deliveryPriceValue).toBe(`${Number(price).toFixed(2)}${currency}`);
    });

});