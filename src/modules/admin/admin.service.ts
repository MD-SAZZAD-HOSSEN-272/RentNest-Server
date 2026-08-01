import { prisma } from "../../lib/prisma";

const getAllUsers = async () => {
    return prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            image: true,
            role: true,
            status: true,
            createdAt: true,
            updatedAt: true
        }
    });
};

const updateUserStatus = async (userId: string, status: string) => {
    const allowed = ["ACTIVE", "BLOCKED"];

    if (!allowed.includes(status)) {
        throw new Error("Invalid status. Allowed values: ACTIVE, BLOCKED");
    }

    return prisma.user.update({
        where: { id: userId },
        data: {
            status: status as any
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            status: true
        }
    });
};

const getAllProperties = async () => {
    return prisma.property.findMany({
        include: {
            landlord: {
                select: { id: true, name: true, email: true }
            },
            category: true
        }
    });
};

const getAllRentalRequests = async () => {
    return prisma.rentalRequest.findMany({
        include: {
            property: true,
            tenant: true
        }
    });
};

export const adminService = {
    getAllUsers,
    updateUserStatus,
    getAllProperties,
    getAllRentalRequests
};
