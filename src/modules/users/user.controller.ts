import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { userService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const userCreate = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userData = req.body;

    const result = await userService.userCreateIntoDatabase(userData);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User created successfully",
        data: result
    })
})


const userGetById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user as { id: string }; 

    const result = await userService.userGetById(id as string);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User retrieved successfully",
        data: result
    })
})

export const userController = {
    userCreate,
    userGetById
}