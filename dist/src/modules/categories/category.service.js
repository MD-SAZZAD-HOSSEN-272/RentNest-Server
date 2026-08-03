import { prisma } from "../../lib/prisma";
const getAllCategories = async () => {
    return prisma.category.findMany();
};
const createCategory = async (payload) => {
    const existing = await prisma.category.findUnique({
        where: { slug: payload.slug }
    });
    if (existing) {
        throw new Error("Category with this slug already exists");
    }
    return prisma.category.create({
        data: payload
    });
};
export const categoryService = {
    getAllCategories,
    createCategory
};
//# sourceMappingURL=category.service.js.map