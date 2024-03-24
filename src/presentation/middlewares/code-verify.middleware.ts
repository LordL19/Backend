import { NextFunction, Request, Response } from "express";
import { Jwt } from "../../config";

const jwt = Jwt

export class CodeVericationMiddleware {
    static async ValidateCode(req: Request, res: Response, next: NextFunction) {
        const token = req.cookies.code ?? null;
        if (!token) return res.status(400).json({ error: "Code not provided in cookies." })
        try {
            const payload = await jwt.verifyToken<{ code: string }>(token);
            req.body.server_code = payload.code;
            next();
        } catch (error) {
            next(error);
        }
    }
}
