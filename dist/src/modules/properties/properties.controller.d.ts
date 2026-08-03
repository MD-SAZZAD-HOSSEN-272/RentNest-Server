import { NextFunction, Request, Response } from "express";
export declare const propertiesController: {
    getAllProperties: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getPropertyById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createProperty: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateProperty: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteProperty: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=properties.controller.d.ts.map