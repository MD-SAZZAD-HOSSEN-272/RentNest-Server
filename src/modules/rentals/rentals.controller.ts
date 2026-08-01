import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { rentalsService } from "./rentals.service";

const createRentalRequest = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const tenantId = (req.user as { id: string }).id;
    const payload = req.body;

    const result = await rentalsService.createRentalRequest(tenantId, payload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Rental request created successfully",
        data: result
    });
});

const getRentalsForUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req.user as { id: string }).id;
    const role = (req.user as { role: string }).role;

    const result = await rentalsService.getRentalsForUser(userId, role);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental requests retrieved successfully",
        data: result
    });
});

const getRentalById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const rentalId = req.params.id;
    const userId = (req.user as { id: string }).id;
    const role = (req.user as { role: string }).role;

    const result = await rentalsService.getRentalById(rentalId as string, userId, role);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental request details retrieved successfully",
        data: result
    });
});

const updateRentalStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const rentalId = req.params.id;
    const landlordId = (req.user as { id: string }).id;
    const { status } = req.body;

    const result = await rentalsService.updateRentalStatus(rentalId as string, landlordId, status);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental request status updated successfully",
        data: result
    });
});

export const rentalsController = {
    createRentalRequest,
    getRentalsForUser,
    getRentalById,
    updateRentalStatus
};
