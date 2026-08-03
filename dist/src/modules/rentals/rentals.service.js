import { prisma } from "../../lib/prisma";
const createRentalRequest = async (tenantId, payload) => {
    const { propertyId, moveInDate, message } = payload;
    const property = await prisma.property.findUnique({
        where: { id: propertyId }
    });
    if (!property) {
        throw new Error("Property not found");
    }
    if (!property.available) {
        throw new Error("Property is not available for rent");
    }
    return prisma.rentalRequest.create({
        data: {
            tenantId,
            propertyId,
            moveInDate: moveInDate ? new Date(moveInDate) : undefined,
            message
        }
    });
};
const getRentalsForUser = async (userId, role) => {
    if (role === "TENANT") {
        return prisma.rentalRequest.findMany({
            where: { tenantId: userId },
            include: { property: true }
        });
    }
    if (role === "LANDLORD") {
        return prisma.rentalRequest.findMany({
            where: { property: { landlordId: userId } },
            include: { property: true, tenant: true }
        });
    }
    return prisma.rentalRequest.findMany({
        include: { property: true, tenant: true }
    });
};
const getRentalById = async (rentalId, userId, role) => {
    const rental = await prisma.rentalRequest.findUnique({
        where: { id: rentalId },
        include: { property: true, tenant: true }
    });
    if (!rental) {
        throw new Error("Rental request not found");
    }
    if (role === "TENANT" && rental.tenantId !== userId) {
        throw new Error("You are not allowed to access this rental request");
    }
    if (role === "LANDLORD" && rental.property.landlordId !== userId) {
        throw new Error("You are not allowed to access this rental request");
    }
    return rental;
};
const updateRentalStatus = async (rentalId, landlordId, status) => {
    const rental = await prisma.rentalRequest.findUnique({
        where: { id: rentalId },
        include: { property: true }
    });
    if (!rental) {
        throw new Error("Rental request not found");
    }
    if (rental.property.landlordId !== landlordId) {
        throw new Error("You are not allowed to update this rental request");
    }
    return prisma.rentalRequest.update({
        where: { id: rentalId },
        data: {
            status: status
        }
    });
};
export const rentalsService = {
    createRentalRequest,
    getRentalsForUser,
    getRentalById,
    updateRentalStatus
};
//# sourceMappingURL=rentals.service.js.map