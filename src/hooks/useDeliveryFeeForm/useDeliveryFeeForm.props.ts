export interface FormDetailsInterface{
    cartValue: number;
    deliveryDistance: number;
    itemCount: number;
    deliveryDate: Date;
}

export interface ErrorInterface{
    error: boolean;
    message: string;
}

export interface OrderDateInterface{
    day: number;
    hour: number;
}