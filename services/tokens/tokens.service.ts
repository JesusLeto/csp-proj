import jwt from "jsonwebtoken"
import { CommonService } from "../common.service"
import APIError from "../../exception/ApiError"

interface jwtPayload {
    id: string
}

interface jwtError {
    error: unknown
}

class TokenService extends CommonService{
    generateTokens(payload: string) {
        const accessToken =jwt.sign({id: payload}, "JwtAccessSecret", {expiresIn: '60m'})
        const refreshToken =jwt.sign({id: payload}, "JwtRefreshSecret", {expiresIn: '60m'})
        return {
            accessToken,
            refreshToken
        }
    }

    verifyToken(token: string) {
        try {
            return jwt.verify(token, "JwtAccessSecret")
        } catch (e) {
            throw APIError.UnauthorizedError()
        }
    }

    async saveRefreshToken(userId: string, refreshToken: string) {
        await this.db.query('UPDATE users SET refresh_token = $1 WHERE id = $2', [refreshToken, userId])
    }
}



export default new TokenService()