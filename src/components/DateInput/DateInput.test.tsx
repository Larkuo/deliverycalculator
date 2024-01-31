import React from 'react';
import { render, screen } from '@testing-library/react';
import { DateInput } from './DateInput';

describe("Testing Date Input Component", () => {
    test('Renders test date input & label', () => {
        render(
            <DateInput 
                name={'dateInputTest'} 
                inputLabel={'Date Input Test'} 
                onChangeDateValue={() => {}}
            />
        );

        const dateInputLabel = screen.getByText("Date Input Test");
        expect(dateInputLabel).toBeInTheDocument();

        const dateInput = screen.getByTestId("dateInputTest");
        expect(dateInput).toBeInTheDocument();
    });

});