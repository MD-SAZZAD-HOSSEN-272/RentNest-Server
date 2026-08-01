export interface IPaymentRequest {
        rentalRequestId: string;
        amount: number;
        provider: "SSLCOMMERZ" | "STRIPE";
    };