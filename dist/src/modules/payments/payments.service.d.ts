import { IPaymentRequest } from "./payments.interface";
declare const createPayment: (tenantId: string, payload: IPaymentRequest) => Promise<{
    payment: {
        id: string;
        transactionId: string;
        rentalRequestId: string;
        amount: number;
        provider: import("../../../generated/prisma/enums").PaymentProvider;
        status: import("../../../generated/prisma/enums").PaymentStatus;
        paidAt: Date | null;
        valId: string | null;
        createdAt: Date;
        updatedAt: Date;
    };
    gatewayPageURL: any;
}>;
declare const confirmPayment: (payload: any) => Promise<{
    id: string;
    transactionId: string;
    rentalRequestId: string;
    amount: number;
    provider: import("../../../generated/prisma/enums").PaymentProvider;
    status: import("../../../generated/prisma/enums").PaymentStatus;
    paidAt: Date | null;
    valId: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const failPayment: (payload: any) => Promise<{
    id: string;
    transactionId: string;
    rentalRequestId: string;
    amount: number;
    provider: import("../../../generated/prisma/enums").PaymentProvider;
    status: import("../../../generated/prisma/enums").PaymentStatus;
    paidAt: Date | null;
    valId: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const cancelPayment: (payload: any) => Promise<{
    id: string;
    transactionId: string;
    rentalRequestId: string;
    amount: number;
    provider: import("../../../generated/prisma/enums").PaymentProvider;
    status: import("../../../generated/prisma/enums").PaymentStatus;
    paidAt: Date | null;
    valId: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const getPayments: (userId: string, role: string) => Promise<({
    rentalRequest: {
        id: string;
        tenantId: string;
        propertyId: string;
        moveInDate: Date | null;
        message: string | null;
        status: import("../../../generated/prisma/enums").RentalStatus;
        createdAt: Date;
        updatedAt: Date;
    };
} & {
    id: string;
    transactionId: string;
    rentalRequestId: string;
    amount: number;
    provider: import("../../../generated/prisma/enums").PaymentProvider;
    status: import("../../../generated/prisma/enums").PaymentStatus;
    paidAt: Date | null;
    valId: string | null;
    createdAt: Date;
    updatedAt: Date;
})[]>;
declare const getPaymentById: (paymentId: string, userId: string, role: string) => Promise<{
    rentalRequest: {
        property: {
            id: string;
            title: string;
            description: string;
            location: string;
            price: number;
            bedrooms: number;
            bathrooms: number;
            amenities: string[];
            images: string[];
            available: boolean;
            landlordId: string;
            categoryId: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        tenantId: string;
        propertyId: string;
        moveInDate: Date | null;
        message: string | null;
        status: import("../../../generated/prisma/enums").RentalStatus;
        createdAt: Date;
        updatedAt: Date;
    };
} & {
    id: string;
    transactionId: string;
    rentalRequestId: string;
    amount: number;
    provider: import("../../../generated/prisma/enums").PaymentProvider;
    status: import("../../../generated/prisma/enums").PaymentStatus;
    paidAt: Date | null;
    valId: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const paymentsService: {
    createPayment: typeof createPayment;
    confirmPayment: typeof confirmPayment;
    failPayment: typeof failPayment;
    cancelPayment: typeof cancelPayment;
    getPayments: typeof getPayments;
    getPaymentById: typeof getPaymentById;
};
export {};
//# sourceMappingURL=payments.service.d.ts.map