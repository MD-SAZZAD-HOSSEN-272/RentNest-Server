import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { paymentsService } from "./payments.service";
import config from "../../config";

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

// SSLCommerz redirects the tenant's browser to these three endpoints after
// checkout. They must respond with a redirect to the frontend (not JSON),
// since a real browser lands here, not our own fetch code.
const confirmPayment = catchAsync(async (req: Request, res: Response) => {
    const payload = { ...req.query, ...req.body };

    try {
        const payment = await paymentsService.confirmPayment(payload);
        return res.redirect(`${config.app_url}/payment/success?rentalId=${payment.rentalRequestId}`);
    } catch (error) {
        return res.redirect(`${config.app_url}/payment/cancel`);
    }
});

const failPayment = catchAsync(async (req: Request, res: Response) => {
    const payload = { ...req.query, ...req.body };

    try {
        const payment = await paymentsService.failPayment(payload);
        return res.redirect(`${config.app_url}/payment/cancel?rentalId=${payment.rentalRequestId}`);
    } catch (error) {
        return res.redirect(`${config.app_url}/payment/cancel`);
    }
});

const cancelPayment = catchAsync(async (req: Request, res: Response) => {
    const payload = { ...req.query, ...req.body };

    try {
        const payment = await paymentsService.cancelPayment(payload);
        return res.redirect(`${config.app_url}/payment/cancel?rentalId=${payment.rentalRequestId}`);
    } catch (error) {
        return res.redirect(`${config.app_url}/payment/cancel`);
    }
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
    failPayment,
    cancelPayment,
    getPayments,
    getPaymentById
};
