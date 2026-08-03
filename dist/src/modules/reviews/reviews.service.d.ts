declare const createReview: (tenantId: string, payload: Record<string, unknown>) => Promise<{
    id: string;
    rating: number;
    comment: string;
    tenantId: string;
    propertyId: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const reviewsService: {
    createReview: typeof createReview;
};
export {};
//# sourceMappingURL=reviews.service.d.ts.map