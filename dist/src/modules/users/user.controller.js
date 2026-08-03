import { catchAsync } from "../../utils/catchAsync";
import { userService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
const userCreate = catchAsync(async (req, res, next) => {
    const userData = req.body;
    const result = await userService.userCreateIntoDatabase(userData);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User created successfully",
        data: result
    });
});
const userGetById = catchAsync(async (req, res, next) => {
    const { id } = req.user;
    const result = await userService.userGetById(id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User retrieved successfully",
        data: result
    });
});
export const userController = {
    userCreate,
    userGetById
};
//# sourceMappingURL=user.controller.js.map