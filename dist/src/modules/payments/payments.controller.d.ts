import { NextFunction, Request, Response } from "express";
export declare const paymentsController: {
    createPayment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    confirmPayment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    failPayment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    cancelPayment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getPayments: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getPaymentById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=payments.controller.d.ts.map