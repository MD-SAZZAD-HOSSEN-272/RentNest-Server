import { Router } from "express";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { rentalsController } from "./rentals.controller";

const router = Router();

router.post("/rentals", auth(Role.TENANT), rentalsController.createRentalRequest);
router.get("/rentals", auth(Role.TENANT, Role.LANDLORD, Role.ADMIN), rentalsController.getRentalsForUser);
router.get("/rentals/:id", auth(Role.TENANT, Role.LANDLORD, Role.ADMIN), rentalsController.getRentalById);
router.patch("/landlord/requests/:id", auth(Role.LANDLORD), rentalsController.updateRentalStatus);

export const rentalsRoutes = router;
