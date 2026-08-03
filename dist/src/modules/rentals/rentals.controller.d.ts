import { NextFunction, Request, Response } from "express";
export declare const rentalsController: {
    createRentalRequest: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getRentalsForUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getRentalById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateRentalStatus: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=rentals.controller.d.ts.map