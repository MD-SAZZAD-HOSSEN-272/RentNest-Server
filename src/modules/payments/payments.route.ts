import { Router } from "express";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { paymentsController } from "./payments.controller";

const router = Router();

router.post("/create", auth(Role.TENANT), paymentsController.createPayment);
router.post("/confirm", paymentsController.confirmPayment);
router.get("/", auth(Role.TENANT, Role.LANDLORD, Role.ADMIN), paymentsController.getPayments);
router.get("/:id", auth(Role.TENANT, Role.LANDLORD, Role.ADMIN), paymentsController.getPaymentById);

export const paymentsRoutes = router;
