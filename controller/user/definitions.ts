import express from "express"
import { JwtPayload } from "jsonwebtoken"

export interface UserLogin {
    email: string,
    password: string
}

export interface UserRegister extends UserLogin {
    name: string
}

export interface UserRequest<T> extends express.Request {
    body: T
}

export interface JwtRequest extends express.Request {
    body: {
        _tokenPayload: JwtPayload
    }
}