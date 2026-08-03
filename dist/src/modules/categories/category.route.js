import { Router } from "express";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { categoryController } from "./category.controller";
const router = Router();
router.get("/", categoryController.getAllCategories);
router.post("/", auth(Role.ADMIN), categoryController.createCategory);
export const categoryRoutes = router;
//# sourceMappingURL=category.route.js.map