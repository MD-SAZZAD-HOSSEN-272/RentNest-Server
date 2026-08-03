import { IUser } from "./user.interface";
import { Role, UserStatus } from "../../../generated/prisma/enums";
declare const userCreateIntoDatabase: (userData: IUser) => Promise<{
    id: string;
    name: string;
    email: string;
    phone: string | null;
    image: string | null;
    role: Role;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const userGetById: (id: string) => Promise<{
    id: string;
    name: string;
    email: string;
    phone: string | null;
    image: string | null;
    role: Role;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const userService: {
    userCreateIntoDatabase: typeof userCreateIntoDatabase;
    userGetById: typeof userGetById;
};
export {};
//# sourceMappingURL=user.service.d.ts.map