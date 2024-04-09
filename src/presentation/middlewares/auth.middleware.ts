import { NextFunction, Request, Response } from "express";
import { Jwt } from "../../helpers";

const jwt = Jwt
export class AuthMiddleware {

    static async ValidateUser(req: Request, res: Response, next: NextFunction) {
        const auth = req.cookies.token ?? req.headers.authorization ?? null;
        if (!auth) return res.status(400).json({ error: { auth: "Authentication token not provided." } })
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

    static async ValidateResetPassword(req: Request, res: Response, next: NextFunction) {
        const auth = req.cookies.token ?? req.headers.authorization ?? null;
        if (!auth) return res.status(400).json({ error: { auth: "Authentication token not provided." } })
        let token = auth;
        if (auth.startsWith("Bearer ")) token = auth.split(" ")[1];
        try {
            const payload = await jwt.verifyToken<{ id: number, validatedCode: boolean }>(token);
            if (!payload.validatedCode) return res.status(400).json({ error: { auth: "You must verify the code before performing this process." } })
            req.body.user = payload.id;
            next();
        } catch (error) {
            next(error);
        }
    }

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
