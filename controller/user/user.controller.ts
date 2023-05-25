import express from "express"
import UsersService from "../../services/users/users.service"
import {JwtRequest, UserLogin, UserRegister, UserRequest} from "./definitions"


class UsersController {
    async registration(req: UserRequest<UserRegister>, res: express.Response, next: express.NextFunction) {
        try {
            const {body} = req
            const tokens = await UsersService.registration(body)
            return res.status(200).json(tokens)
        } catch (e) {
            next(e)
        }
    }

    async login(req: UserRequest<UserLogin>, res: express.Response, next: express.NextFunction) {
        try {
            const {body} = req
            const tokens = await UsersService.login(body)
            return res.status(200).json(tokens)
        } catch (e) {
            next(e)
        }
    }

    async user(req: JwtRequest, res: express.Response, next: express.NextFunction) {
        const {id} = req.body._tokenPayload
        try {
            const ret = await UsersService.getUser(id)
            return res.status(200).json(ret)
        } catch (e) {
            next(e)
        }
    }
}

export default new UsersController()