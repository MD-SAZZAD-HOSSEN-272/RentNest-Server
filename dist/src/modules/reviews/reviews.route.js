import { Router } from "express";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { reviewsController } from "./reviews.controller";
const router = Router();
router.post("/", auth(Role.TENANT), reviewsController.createReview);
export const reviewsRoutes = router;
//# sourceMappingURL=reviews.route.js.map