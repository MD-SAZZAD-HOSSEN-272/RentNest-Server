import { catchAsync } from "../../utils/catchAsync";
import { propertiesService } from "./properties.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
const getAllProperties = catchAsync(async (req, res, next) => {
    const query = req.query;
    const result = await propertiesService.getAllProperties(query);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Properties retrieved successfully",
        data: result
    });
});
const getPropertyById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
        throw new Error("Invalid property id");
    }
    const result = await propertiesService.getPropertyById(id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Property details retrieved successfully",
        data: result
    });
});
const createProperty = catchAsync(async (req, res, next) => {
    const landlordId = req.user.id;
    const payload = req.body;
    const result = await propertiesService.createProperty(landlordId, payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Property created successfully",
        data: result
    });
});
const updateProperty = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
        throw new Error("Invalid property id");
    }
    const landlordId = req.user.id;
    const payload = req.body;
    const result = await propertiesService.updateProperty(id, landlordId, payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Property updated successfully",
        data: result
    });
});
const deleteProperty = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
        throw new Error("Invalid property id");
    }
    const landlordId = req.user.id;
    await propertiesService.deleteProperty(id, landlordId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Property deleted successfully",
        data: null
    });
});
export const propertiesController = {
    getAllProperties,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty
};
//# sourceMappingURL=properties.controller.js.map