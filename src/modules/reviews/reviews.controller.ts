import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { reviewsService } from "./reviews.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createReview = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const tenantId = (req.user as { id: string }).id;
    const result = await reviewsService.createReview(tenantId, req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Review submitted successfully",
        data: result
    });
});

export const reviewsController = {
    createReview
};
