declare const getAllCategories: () => Promise<{
    id: string;
    name: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}[]>;
declare const createCategory: (payload: {
    name: string;
    slug: string;
}) => Promise<{
    id: string;
    name: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const categoryService: {
    getAllCategories: typeof getAllCategories;
    createCategory: typeof createCategory;
};
export {};
//# sourceMappingURL=category.service.d.ts.map