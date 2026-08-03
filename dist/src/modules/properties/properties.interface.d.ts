export interface IProperties {
    title: string;
    description: string;
    location: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    amenities: string[];
    images: string[];
    categoryId?: string;
    categorySlug?: string;
    categoryName?: string;
    type?: string;
}
export interface IUpdateProperty {
    title?: string;
    description?: string;
    location?: string;
    price?: number;
    bedrooms?: number;
    bathrooms?: number;
    amenities?: string[];
    images?: string[];
    available?: boolean;
    categoryId?: string;
}
//# sourceMappingURL=properties.interface.d.ts.map