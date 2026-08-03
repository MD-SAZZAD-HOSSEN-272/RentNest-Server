import { prisma } from "../../lib/prisma";
import { Role, UserStatus } from "../../../generated/prisma/enums";
import bcrypt from "bcrypt";
const userCreateIntoDatabase = async (userData) => {
    const { email, password, role: userRole, ...rest } = userData;
    const allowedRoles = [Role.TENANT, Role.LANDLORD];
    const rawRole = typeof userRole === "string" ? userRole : undefined;
    if (rawRole && !allowedRoles.includes(rawRole)) {
        throw new Error("Invalid role for registration. Only TENANT or LANDLORD are allowed.");
    }
    const role = rawRole && allowedRoles.includes(rawRole) ? rawRole : Role.TENANT;
    const isUserExist = await prisma.user.findUnique({
        where: { email }
    });
    if (isUserExist) {
        throw new Error("User already exists with this email");
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await prisma.user.create({
        data: {
            ...rest,
            email,
            password: hashedPassword,
            role,
            status: UserStatus.ACTIVE
        },
        omit: {
            password: true
        }
    });
    return result;
};
const userGetById = async (id) => {
    const user = await prisma.user.findUnique({
        where: { id },
        omit: {
            password: true
        }
    });
    if (!user) {
        throw new Error("User not found");
    }
    return user;
};
export const userService = {
    userCreateIntoDatabase,
    userGetById
};
//# sourceMappingURL=user.service.js.map