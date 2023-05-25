import bcrypt from "bcrypt"
import { v4 as uuidv4 } from 'uuid';
import { CommonService } from "../common.service";
import tokensService from "../tokens/tokens.service";
import APIError from "../../exception/ApiError";

interface UserLogin {
    email: string,
    password: string
}

interface UserRegister extends UserLogin {
    name: string
}

interface UserDto {
    name: string,
    email: string
}

class UserService extends CommonService{
    async registration (userRegData: UserRegister) {
        const {rows} = await this.db.query('SELECT id FROM users WHERE email = $1', [userRegData.email]);
        if (rows.length) {
            throw new APIError('User already exist', 403)
        }
        const hashPassword = await bcrypt.hash(userRegData.password, 3)
        const userId = uuidv4()
        const tokens = tokensService.generateTokens(userId)
        const values = [
            userId,
            userRegData.name,
            hashPassword,
            userRegData.email,
            new Date().toISOString(),
            tokens.refreshToken
        ]

        await this.db.query('INSERT INTO users(id, name, password, email, created_on, refresh_token) VALUES($1, $2, $3, $4, $5, $6)', values)
        return tokens
    }

    async login (userLogData: UserLogin) {
        const { rows } = await this.db.query('SELECT id, password FROM users WHERE email = $1', [userLogData.email])
        if (!rows.length) {
            throw APIError.NotFoundError('Email not found')
        }
        const data = rows[0],
            isValidPass = await bcrypt.compare(userLogData.password, data.password)
        if (!isValidPass) {
            throw APIError.NotFoundError('Error password')
        }

        const tokens = tokensService.generateTokens(data.id)
        await tokensService.saveRefreshToken(data.id, tokens.refreshToken)
        // TODO handle error
        return tokens
    }

    async getUser(id: string) {
        const { rows } = await this.db.query('SELECT name, email FROM users WHERE id = $1', [id])
        if (!rows.length) {
            throw APIError.NotFoundError('Email not found')
        }
        const data = rows[0] as UserDto

        return data
    } 
}


export default new UserService()