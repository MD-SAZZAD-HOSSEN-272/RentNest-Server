export declare const Role: {
    readonly TENANT: 'TENANT';
    readonly LANDLORD: 'LANDLORD';
    readonly ADMIN: 'ADMIN';
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const UserStatus: {
    readonly ACTIVE: 'ACTIVE';
    readonly BLOCKED: 'BLOCKED';
};
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
export declare const RentalStatus: {
    readonly PENDING: 'PENDING';
    readonly APPROVED: 'APPROVED';
    readonly REJECTED: 'REJECTED';
    readonly COMPLETED: 'COMPLETED';
    readonly CANCELLED: 'CANCELLED';
};
export type RentalStatus = (typeof RentalStatus)[keyof typeof RentalStatus];
export declare const PaymentStatus: {
    readonly PENDING: 'PENDING';
    readonly COMPLETED: 'COMPLETED';
    readonly FAILED: 'FAILED';
};
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
export declare const PaymentProvider: {
    readonly STRIPE: 'STRIPE';
    readonly SSLCOMMERZ: 'SSLCOMMERZ';
};
export type PaymentProvider = (typeof PaymentProvider)[keyof typeof PaymentProvider];
//# sourceMappingURL=enums.d.ts.map