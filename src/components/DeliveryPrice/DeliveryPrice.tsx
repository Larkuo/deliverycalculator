import React from "react";
import "./DeliveryPrice.css";

interface DeliveryPriceProps{
    currency: String;
    price: number;
    dataTestID?: string;
}

export function DeliveryPrice({
    currency,
    price,
    dataTestID = "fee",
}:DeliveryPriceProps){
    return(
        <div className="delivery-price-container" data-testid={dataTestID}>
            <span className="delivery-price-label">Delivery price: </span>
            <span className="delivery-price-number" data-testid="priceValue">{Number(price).toFixed(2)}{currency}</span>
        </div>
    );
}