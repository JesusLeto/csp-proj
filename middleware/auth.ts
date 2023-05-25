import express from "express";
import APIError from "../exception/ApiError";
import tokensService from "../services/tokens/tokens.service";
import { JwtRequest } from "../controller/user/definitions";

export default function authMiddlerware(req: express.Request, res: express.Response, next: express.NextFunction) {
    const authHeader = req.headers.authorization;
    console.log(req.headers)
    if (!authHeader) {
        next(APIError.UnauthorizedError())
        return
    }

    const token = authHeader.split(" ")[1]
    if (!token) {
        next(APIError.UnauthorizedError())
        return
    }

    try {
        const decoded = tokensService.verifyToken(token);
        if (typeof(decoded) === 'string') throw APIError.UnauthorizedError();
        req.body._tokenPayload = decoded;
        next()
    } catch (e) {
        next(e)
    }

}