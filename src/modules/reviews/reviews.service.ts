import { prisma } from "../../lib/prisma";

const createReview = async (tenantId: string, payload: Record<string, unknown>) => {
    const { propertyId, rating, comment } = payload as {
        propertyId: string;
        rating: number;
        comment: string;
    };

    const rental = await prisma.rentalRequest.findFirst({
        where: { tenantId, propertyId, status: "COMPLETED" }
    });

    if (!rental) {
        throw new Error("You can only review a completed rental.");
    }

    return prisma.review.create({
        data: {
            tenantId,
            propertyId,
            rating,
            comment
        }
    });
};

export const reviewsService = {
    createReview
};
