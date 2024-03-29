import { NextFunction, Request, Response } from "express";
import { Jwt } from "../../config";
const jwt = Jwt
export class AuthMiddleware {

    static async ValidateUser(req: Request, res: Response, next: NextFunction) {
        const auth = req.cookies.token ?? req.headers.authorization  ?? null;
        if (!auth) return res.status(400).json({ error: "Authentication token not provided" })
        let token = auth;
        if (auth.startsWith("Bearer ")) token = auth.split(" ")[1];
        try {
            const payload = await jwt.verifyToken<{ id: number }>(token);
            req.body.user = payload.id;
            next();
        } catch (error) {
            next(error);
        }
    }
}
