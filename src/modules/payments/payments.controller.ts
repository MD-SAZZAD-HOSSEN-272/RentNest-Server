import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { paymentsService } from "./payments.service";

const createPayment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const tenantId = (req.user as { id: string }).id;
    const result = await paymentsService.createPayment(tenantId, req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Payment session created successfully",
        data: result
    });
});

const confirmPayment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await paymentsService.confirmPayment(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Payment confirmed successfully",
        data: result
    });
});

const getPayments = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req.user as { id: string }).id;
    const role = (req.user as { role: string }).role;
    const result = await paymentsService.getPayments(userId, role);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Payments retrieved successfully",
        data: result
    });
});

const getPaymentById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const paymentId = req.params.id as string;
    const userId = (req.user as { id: string }).id;
    const role = (req.user as { role: string }).role;
    const result = await paymentsService.getPaymentById(paymentId, userId, role);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Payment retrieved successfully",
        data: result
    });
});

export const paymentsController = {
    createPayment,
    confirmPayment,
    getPayments,
    getPaymentById
};
