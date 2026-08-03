import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { rentalsService } from "./rentals.service";
const createRentalRequest = catchAsync(async (req, res, next) => {
    const tenantId = req.user.id;
    const payload = req.body;
    const result = await rentalsService.createRentalRequest(tenantId, payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Rental request created successfully",
        data: result
    });
});
const getRentalsForUser = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const role = req.user.role;
    const result = await rentalsService.getRentalsForUser(userId, role);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental requests retrieved successfully",
        data: result
    });
});
const getRentalById = catchAsync(async (req, res, next) => {
    const rentalId = req.params.id;
    const userId = req.user.id;
    const role = req.user.role;
    const result = await rentalsService.getRentalById(rentalId, userId, role);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental request details retrieved successfully",
        data: result
    });
});
const updateRentalStatus = catchAsync(async (req, res, next) => {
    const rentalId = req.params.id;
    const landlordId = req.user.id;
    const { status } = req.body;
    const result = await rentalsService.updateRentalStatus(rentalId, landlordId, status);
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
//# sourceMappingURL=rentals.controller.js.map