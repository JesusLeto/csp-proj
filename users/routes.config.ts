import { RouterConfiug } from "../common/routes.config";
import express from "express"

export class UsersRouter extends RouterConfiug {
    constructor(app: express.Application) {
        super(app, "UsersRouter")
    }
}