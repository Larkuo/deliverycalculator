import React from 'react';
import { render, screen } from '@testing-library/react';
import { NumberInput } from './NumberInput';

describe("Testing Number Input Component", () => {
    test('Renders test number input & label', () => {
        render(
            <NumberInput 
                name={'numberInputTest'} 
                inputLabel={'Number Input Test'} 
                onChangeInputValue={() => {}}
            />
        );

        const numberInputLabel = screen.getByText("Number Input Test");
        expect(numberInputLabel).toBeInTheDocument();

        const numberInput = screen.getByTestId("numberInputTest");
        expect(numberInput).toBeInTheDocument();
    });

});