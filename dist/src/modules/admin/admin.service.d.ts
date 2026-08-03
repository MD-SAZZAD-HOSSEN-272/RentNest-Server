declare const getAllUsers: () => Promise<{
    createdAt: Date;
    email: string;
    id: string;
    image: string | null;
    name: string;
    phone: string | null;
    role: import("../../../generated/prisma/enums").Role;
    status: import("../../../generated/prisma/enums").UserStatus;
    updatedAt: Date;
}[]>;
declare const updateUserStatus: (userId: string, status: string) => Promise<{
    email: string;
    id: string;
    name: string;
    role: import("../../../generated/prisma/enums").Role;
    status: import("../../../generated/prisma/enums").UserStatus;
}>;
declare const getAllProperties: () => Promise<({
    category: {
        id: string;
        name: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
    };
    landlord: {
        email: string;
        id: string;
        name: string;
    };
} & {
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
})[]>;
declare const getAllRentalRequests: () => Promise<({
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
})[]>;
export declare const adminService: {
    getAllUsers: typeof getAllUsers;
    updateUserStatus: typeof updateUserStatus;
    getAllProperties: typeof getAllProperties;
    getAllRentalRequests: typeof getAllRentalRequests;
};
export {};
//# sourceMappingURL=admin.service.d.ts.map