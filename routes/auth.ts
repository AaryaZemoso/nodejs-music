import { NextFunction, Request, Response, Router } from "express";
import * as jwt from 'jsonwebtoken';
import properties from "../properties";

export const router = Router();

router.post("/token", (_req: Request, res: Response, _next: NextFunction) => {
    
    const token = jwt.sign({
        userID: "1"
    }, properties.jwtSecretKey);

    res.json({
        token: token,
    })
});
