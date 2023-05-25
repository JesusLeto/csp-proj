import { CommonRouterConfig } from "./common.router";
import express from "express"
import userController from "../controller/user/user.controller";
import authMiddlerware from "../middleware/auth";

export class UsersRouter extends CommonRouterConfig {
    constructor(app: express.Application) {
        super(app, "UsersRouter")
    }

    configureRoutes() {
        
        this.router.post('/registration', userController.registration)
        this.router.post('/login', userController.login)
        this.router.post('/logout')
        this.router.get('/refresh')

        this.router.get("/user", authMiddlerware, userController.user)

        return this.app 
    }
}