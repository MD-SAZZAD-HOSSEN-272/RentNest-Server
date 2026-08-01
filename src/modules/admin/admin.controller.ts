import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { adminService } from "./admin.service";

const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await adminService.getAllUsers();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Users retrieved successfully",
        data: result
    });
});

const updateUserStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { status } = req.body;

    const result = await adminService.updateUserStatus(id as string, status);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User status updated successfully",
        data: result
    });
});

const getAllProperties = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await adminService.getAllProperties();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Properties retrieved successfully",
        data: result
    });
});

const getAllRentalRequests = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await adminService.getAllRentalRequests();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental requests retrieved successfully",
        data: result
    });
});

export const adminController = {
    getAllUsers,
    updateUserStatus,
    getAllProperties,
    getAllRentalRequests
};
