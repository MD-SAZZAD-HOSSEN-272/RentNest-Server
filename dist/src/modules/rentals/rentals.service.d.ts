import { IRentalRequest } from "./rentals.interface";
declare const createRentalRequest: (tenantId: string, payload: IRentalRequest) => Promise<{
    id: string;
    tenantId: string;
    propertyId: string;
    moveInDate: Date | null;
    message: string | null;
    status: import("../../../generated/prisma/enums").RentalStatus;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const getRentalsForUser: (userId: string, role: string) => Promise<({
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
})[]>;
declare const getRentalById: (rentalId: string, userId: string, role: string) => Promise<{
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
    tenant: {
        id: string;
        name: string;
        email: string;
        password: string;
        phone: string | null;
        image: string | null;
        role: import("../../../generated/prisma/enums").Role;
        status: import("../../../generated/prisma/enums").UserStatus;
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
}>;
declare const updateRentalStatus: (rentalId: string, landlordId: string, status: string) => Promise<{
    id: string;
    tenantId: string;
    propertyId: string;
    moveInDate: Date | null;
    message: string | null;
    status: import("../../../generated/prisma/enums").RentalStatus;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const rentalsService: {
    createRentalRequest: typeof createRentalRequest;
    getRentalsForUser: typeof getRentalsForUser;
    getRentalById: typeof getRentalById;
    updateRentalStatus: typeof updateRentalStatus;
};
export {};
//# sourceMappingURL=rentals.service.d.ts.map