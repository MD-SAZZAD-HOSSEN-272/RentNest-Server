import { catchAsync } from "../../utils/catchAsync";
import { categoryService } from "./category.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
const getAllCategories = catchAsync(async (req, res, next) => {
    const result = await categoryService.getAllCategories();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Categories retrieved successfully",
        data: result
    });
});
const createCategory = catchAsync(async (req, res, next) => {
    const result = await categoryService.createCategory(req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Category created successfully",
        data: result
    });
});
export const categoryController = {
    getAllCategories,
    createCategory
};
//# sourceMappingURL=category.controller.js.map