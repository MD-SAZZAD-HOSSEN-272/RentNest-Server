import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import { userRoutes } from "./modules/users/user.route";
import { authRoutes } from "./modules/auth/auth.route";
import { propertiesRoutes } from "./modules/properties/properties.route";
import { categoryRoutes } from "./modules/categories/category.route";
import { rentalsRoutes } from "./modules/rentals/rentals.route";
import { paymentsRoutes } from "./modules/payments/payments.route";
import { reviewsRoutes } from "./modules/reviews/reviews.route";
import { adminRoutes } from "./modules/admin/admin.route";




const app : Application = express();

app.use(cors({
    origin: [process.env.NODE_ENV === "production" ? "https://rent-nest-app.vercel.app" : "http://localhost:3000"],
    credentials: true,
}))




app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(cookieParser());


app.get("/",(req : Request, res : Response) => {
    res.send("Hello, World!");
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/properties", propertiesRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1", rentalsRoutes);
app.use("/api/v1/payments", paymentsRoutes);
app.use("/api/v1/reviews", reviewsRoutes);
app.use("/api/v1/admin", adminRoutes);


export default app;