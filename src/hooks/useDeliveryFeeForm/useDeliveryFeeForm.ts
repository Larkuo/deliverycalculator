import { useState } from "react";
import { 
    ErrorInterface, 
    FormDetailsInterface, 
    OrderDateInterface 
} from "./useDeliveryFeeForm.props";

function useDeliveryFeeForm():{
    formDetails: FormDetailsInterface,
    setFormDetails: React.Dispatch<React.SetStateAction<FormDetailsInterface>>;
    onChangeCartValue: (value: number) => void;
    onChangeDistance: (distance: number) => void;
    onChangeItemCount: (count: number) => void;
    onChangeDeliveryDate: (date: Date) => void;
    deliveryPrice: number;
    calculateDeliveryPrice: () => void;
    onFormSubmit: (event: any) => void;
    errorCheck: ErrorInterface;
    resetForm: () => void;
    setOrderDate: React.Dispatch<React.SetStateAction<OrderDateInterface>>;
} {
    const [deliveryPrice, setDeliveryPrice] = useState(0);
    const [formDetails, setFormDetails] = useState<FormDetailsInterface>({
        cartValue: 0,
        deliveryDistance: 0,
        itemCount: 0,
        deliveryDate: new Date()
    });

    const [errorCheck, setErrorCheck] = useState<ErrorInterface>({
        error: false,
        message: ""
    });

    const [orderDate, setOrderDate] = useState<OrderDateInterface>({
        day: new Date().getDay(),
        hour: new Date().getHours()
    });

    function resetForm(){
        setFormDetails({
            cartValue: 0,
            deliveryDistance: 0,
            itemCount: 0,
            deliveryDate: new Date()
        });
        setDeliveryPrice(0);
    }

    function onChangeCartValue(value: number){
        setFormDetails({
            ...formDetails,
            cartValue: value,
        });
    }

    function onChangeDistance(distance: number){
        setFormDetails({
            ...formDetails,
            deliveryDistance: distance,
        });
    }

    function onChangeItemCount(count: number){
        setFormDetails({
            ...formDetails,
            itemCount: count,
        });
    }

    function onChangeDeliveryDate(date: Date){
        setFormDetails({
            ...formDetails,
            deliveryDate: date,
        });
    }

    function calculateDeliveryPrice(){
        // console.log({formDetails});
        if(formDetails.cartValue === 0 || formDetails.deliveryDistance === 0 || formDetails.itemCount === 0){
            setErrorCheck({
                error: true,
                message: "Some fields in the form are empty. Please fill them to get a delivery price."
            });
            setDeliveryPrice(0);
            // console.log("Some fields in the form are empty. Please fill them to get a delivery price.");
            return;
        }else{
            setErrorCheck({error: false, message: "" }); 
        }

        let priceTotal = 0;

        if(formDetails.cartValue >= 200){
            setDeliveryPrice(0);
            return;
        }

        if(formDetails.cartValue < 10){
            const cartSurcharge = 10 - formDetails.cartValue;
            // console.log({cartSurcharge});
            priceTotal += cartSurcharge;
        }

        if(formDetails.deliveryDistance <= 1000){
            priceTotal += 2;
        }else{
            const distanceCharge = 2 + Math.ceil((formDetails.deliveryDistance - 1000)/500);
            // console.log({distanceCharge});
            priceTotal += distanceCharge;
        }

        if(formDetails.itemCount > 4){
            const itemsCharge = (formDetails.itemCount - 4) * 0.5;
            // console.log({itemsCharge});
            priceTotal += itemsCharge;
        }

        if(formDetails.itemCount > 12){
            const bulkFee = 1.20;
            priceTotal += bulkFee;
        }

        if(orderDate.day === 5 && (orderDate.hour >= 15 || orderDate.hour <= 19)){
            // console.log("Price before rush hour(Fri 3-7pm) adjustment: ", priceTotal);
            priceTotal = priceTotal * 1.2;
        }

        // console.log("Price before £15 limit adjustment: ", priceTotal);

        if(priceTotal > 15){
            priceTotal = 15;
        }
        

        setDeliveryPrice(Number(Number(priceTotal).toFixed(2)));
    }

    function onFormSubmit(event: any) {
        event.preventDefault();
    }

    return {
        formDetails,
        setFormDetails,
        onChangeCartValue,
        onChangeDistance,
        onChangeItemCount,
        onChangeDeliveryDate,
        deliveryPrice,
        calculateDeliveryPrice,
        onFormSubmit,
        errorCheck,
        resetForm,
        setOrderDate,
    };
}

export default useDeliveryFeeForm;

