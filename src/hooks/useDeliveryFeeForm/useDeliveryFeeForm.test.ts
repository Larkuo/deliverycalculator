import useDeliveryFeeForm from "./useDeliveryFeeForm";
import { renderHook, act } from "@testing-library/react";

describe("Testing useDeliveryFeeForm Hook - Edit Form Details", () => {
    test("Should initialise form details", () => {
        const { result } = renderHook(useDeliveryFeeForm);

        expect(result.current.formDetails.cartValue).toBe(0);
        expect(result.current.formDetails.deliveryDistance).toBe(0);
        expect(result.current.formDetails.itemCount).toBe(0);
    });

    test("Should change cart value in form details", () => {
        const { result } = renderHook(useDeliveryFeeForm);

        act(() => {
            result.current.onChangeCartValue(304);
        });

        expect(result.current.formDetails.cartValue).toBe(304);
    });

    test("Should change delivery distance in form details", () => {
        const { result } = renderHook(useDeliveryFeeForm);

        act(() => {
            result.current.onChangeDistance(1200);
        });

        expect(result.current.formDetails.deliveryDistance).toBe(1200);
    });

    test("Should change amount of items in form details", () => {
        const { result } = renderHook(useDeliveryFeeForm);

        act(() => {
            result.current.onChangeItemCount(7);
        });

        expect(result.current.formDetails.itemCount).toBe(7);
    });

    test("Should change delivery date in form details", () => {
        const { result } = renderHook(useDeliveryFeeForm);
        const testDate = new Date();

        act(() => {
            result.current.onChangeDeliveryDate(testDate);
        });

        expect(result.current.formDetails.deliveryDate).toBe(testDate);
    });

    test("Should change reset form details", () => {
        const { result } = renderHook(useDeliveryFeeForm);
        const testFormDetails = {
            cartValue: 6.5,
            deliveryDate: new Date("2024-03-13"),
            deliveryDistance: 1510,
            itemCount: 16,
        };

        act(() => {
            result.current.setFormDetails(testFormDetails);
        });

        expect(result.current.formDetails).toBe(testFormDetails);

        act(() => {
            result.current.resetForm();
        });

        expect(result.current.formDetails.cartValue).toBe(0);
        expect(result.current.formDetails.deliveryDistance).toBe(0);
        expect(result.current.formDetails.itemCount).toBe(0);
    });
});

describe("Testing useDeliveryFeeForm Hook - Deliery Price Rules", () => {
    // Keeping everything else constant, the following tests vary inidividual parts of the calculator form to test the calculation rules

    test("Delivery price should have surchage if cartValue < 10", () => {
        const { result } = renderHook(useDeliveryFeeForm);

        act(() => {
            result.current.setFormDetails({
                cartValue: 8.9, // 10 - 8.9 => 1.10 eur
                deliveryDate: new Date(),
                deliveryDistance: 1000, // 1000m => 2.00 eur
                itemCount: 4, // no item count surcharge => 0.00 eur
            });
        });

        act(() => {
            result.current.calculateDeliveryPrice();
        });

        expect(result.current.deliveryPrice).toBe(3.10);
    });

    test("Delivery price should be 2eur for distance <= 1000m", () => {
        const { result } = renderHook(useDeliveryFeeForm);

        act(() => {
            result.current.setFormDetails({
                cartValue: 10, // 10 - 10 => 0.00 eur
                deliveryDate: new Date(),
                deliveryDistance: 695, // 695m => 2.00 eur
                itemCount: 4, // no item count surcharge => 0.00 eur
            });
        });

        act(() => {
            result.current.calculateDeliveryPrice();
        });

        expect(result.current.deliveryPrice).toBe(2);
    });

    test("Delivery price should have distance surchage of 1eur for every 500m > 1000m", () => {
        const { result } = renderHook(useDeliveryFeeForm);

        act(() => {
            result.current.setFormDetails({
                cartValue: 10, // 10 - 10 => 0.00 eur
                deliveryDate: new Date(),
                deliveryDistance: 1001, // 1001m => (2.0 + 1.0) eur
                itemCount: 4, // no item count surcharge => 0.00 eur
            });
        });

        act(() => {
            result.current.calculateDeliveryPrice();
        });

        expect(result.current.deliveryPrice).toBe(3);
    });

    test("Delivery price should have no extra charge where amount of items < 5", () => {
        const { result } = renderHook(useDeliveryFeeForm);

        act(() => {
            result.current.setFormDetails({
                cartValue: 10, // 10 - 10 => 0.00 eur
                deliveryDate: new Date(),
                deliveryDistance: 1000, // 1000m => 2.00 eur
                itemCount: 4, // no item count surcharge => 0.00 eur
            });
        });

        act(() => {
            result.current.calculateDeliveryPrice();
        });

        expect(result.current.deliveryPrice).toBe(2);
    });

    test("Delivery price should have an extra charge of 0.5eur per item where amount of items  > 4", () => {
        const { result } = renderHook(useDeliveryFeeForm);

        act(() => {
            result.current.setFormDetails({
                cartValue: 10, // 10 - 10 => 0.00 eur
                deliveryDate: new Date(),
                deliveryDistance: 1000, // 1000m => 2.00 eur
                itemCount: 7, // (7 - 4) * 0.5 => 1.50 eur
            });
        });

        act(() => {
            result.current.calculateDeliveryPrice();
        });

        expect(result.current.deliveryPrice).toBe(3.5);
    });

    test("Delivery price should have an extra bulk fee of 1.2eur item where amount of items  >= 12", () => {
        const { result } = renderHook(useDeliveryFeeForm);

        act(() => {
            result.current.setFormDetails({
                cartValue: 10, // 10 - 10 => 0.00 eur
                deliveryDate: new Date(),
                deliveryDistance: 1000, // 1000m => 2.00 eur
                itemCount: 14, // 1.2 + (14 - 4) * 0.5 => 6.20 eur
            });
        });

        act(() => {
            result.current.calculateDeliveryPrice();
        });

        expect(result.current.deliveryPrice).toBe(8.2);
    });

    test("Delivery price should not be more than 15€, including possible surcharges", () => {
        const { result } = renderHook(useDeliveryFeeForm);

        act(() => {
            result.current.setFormDetails({
                cartValue: 10, // 10 - 10 => 0.00 eur
                deliveryDate: new Date(),
                deliveryDistance: 7510, // 7500m => 2.0 + RoundUp((7510-1000)/500) =>  (2 + 14) 16.00 eur
                itemCount: 30, // 1.2 + (30 - 4) * 0.5 => (13 + 1.20) 14.20 eur
            });
        });

        act(() => {
            result.current.calculateDeliveryPrice();
        });

        expect(result.current.deliveryPrice).toBe(15);
    });

    test("Delivery price should be zero if cartValue >= 200", () => {
        const { result } = renderHook(useDeliveryFeeForm);

        act(() => {
            result.current.setFormDetails({
                cartValue: 200, // 10 - 200 => 0.00 eur
                deliveryDate: new Date(),
                deliveryDistance: 1200, // 1000m => 2.00 eur
                itemCount: 23,
            });
        });

        expect(result.current.deliveryPrice).toBe(0);
    });

    test("Delivery price should be mutliplied by 1.2x during Friday rush(3-7pm)", () => {
        const { result } = renderHook(useDeliveryFeeForm);

        act(() => {
            result.current.setFormDetails({
                cartValue: 7.5, // 10 - 7.5 => 2.5 eur
                deliveryDate: new Date(),
                deliveryDistance: 1200, // 1200m => (2.00 + 1.00) => 3.00 eur
                itemCount: 10, // (10 - 4) * 0.5 => 3.00 eur
            });  // deliveryPrice = (2.5 + 3 + 3) * 1.2 => 10.2 eur
        });

        act(() => {
            result.current.setOrderDate({
                day: 5,
                hour: 16,
            });
        });

        act(() => {
            result.current.calculateDeliveryPrice();
        });

        expect(result.current.deliveryPrice).toBe(10.2);
    });

    test("Delivery price should be 1.2x during Friday rush(3-7pm) and should not be more than 15€", () => {
        const { result } = renderHook(useDeliveryFeeForm);

        act(() => {
            result.current.setFormDetails({
                cartValue: 6.5, // 10 - 6.5 => 3.5 eur
                deliveryDate: new Date(),
                deliveryDistance: 1510, // 1200m => (2.00 + 2.00) => 4.00 eur
                itemCount: 16, // (16 - 4) * 0.5 => 6.00 eur
            });  // deliveryPrice = (3.5 + 4 + 6) * 1.2 => 16.2 eur
        });

        act(() => {
            result.current.setOrderDate({
                day: 5,
                hour: 16,
            });
        });

        act(() => {
            result.current.calculateDeliveryPrice();
        });

        expect(result.current.deliveryPrice).toBe(15);
    });

});