import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormButton } from './FormButton';

describe("Testing Form Button Component", () => {
    test('Renders test form button & label', () => {
        render(
            <FormButton 
                name={'formButtonTest'} 
                label={'Form Button Test'} 
                onClick={() => {}}
            />
        );

        const formButtonLabel = screen.getByText("Form Button Test");
        expect(formButtonLabel).toBeInTheDocument();

        const formButton = screen.getByTestId("formButtonTest");
        expect(formButton).toBeInTheDocument();
    });

});