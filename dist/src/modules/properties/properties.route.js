import { Router } from "express";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { propertiesController } from "./properties.controller";
const router = Router();
router.get("/", propertiesController.getAllProperties);
router.get("/:id", propertiesController.getPropertyById);
router.post("/", auth(Role.LANDLORD), propertiesController.createProperty);
router.put("/:id", auth(Role.LANDLORD), propertiesController.updateProperty);
router.delete("/:id", auth(Role.LANDLORD), propertiesController.deleteProperty);
export const propertiesRoutes = router;
//# sourceMappingURL=properties.route.js.map