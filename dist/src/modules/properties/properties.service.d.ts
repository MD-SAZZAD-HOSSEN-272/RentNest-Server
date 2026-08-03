import { IProperties, IUpdateProperty } from "./properties.interface";
declare const getAllProperties: (query: Record<string, unknown>) => Promise<({
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
declare const getPropertyById: (propertyId: string) => Promise<{
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
    rentals: {
        id: string;
        tenantId: string;
        propertyId: string;
        moveInDate: Date | null;
        message: string | null;
        status: import("../../../generated/prisma/enums").RentalStatus;
        createdAt: Date;
        updatedAt: Date;
    }[];
    reviews: {
        id: string;
        rating: number;
        comment: string;
        tenantId: string;
        propertyId: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
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
}>;
declare const createProperty: (landlordId: string, payload: IProperties) => Promise<{
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
}>;
declare const updateProperty: (propertyId: string, landlordId: string, payload: IUpdateProperty) => Promise<{
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
}>;
declare const deleteProperty: (propertyId: string, landlordId: string) => Promise<void>;
export declare const propertiesService: {
    getAllProperties: typeof getAllProperties;
    getPropertyById: typeof getPropertyById;
    createProperty: typeof createProperty;
    updateProperty: typeof updateProperty;
    deleteProperty: typeof deleteProperty;
};
export {};
//# sourceMappingURL=properties.service.d.ts.map