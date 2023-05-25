import express, {Router} from 'express'

export abstract class CommonRouterConfig {
    app: express.Application;
    name: string;
    router = express.Router()

    constructor(app: express.Application, name: string) {
        this.app = app
        this.name = name
        this.configureRoutes()
        this.addRoutes()
    }

    getName() {
        return this.name
    }

    abstract configureRoutes(): express.Application

    private addRoutes() {
        this.app.use("/api", this.router)
    }
}