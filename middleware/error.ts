import APIError from "../exception/ApiError";
import express from "express";

export default function errorHandler(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    if (err instanceof APIError) {
        return res.status(err.statusCode).json({error: err.message})
    }
    return res.status(500).json({error: "Some"})
}