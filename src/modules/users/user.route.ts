import { Router } from "express";
import { userController } from "./user.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/register", userController.userCreate);
router.get("/profile", auth(Role.ADMIN, Role.LANDLORD, Role.TENANT), userController.userGetById);


export const userRoutes = router;