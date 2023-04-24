import express from "express";
import http from "http"

import winston from "winston";
import expressWinston from "express-winston"
import cors from "cors"
import { RouterConfiug } from "./common/routes.config";
import { UsersRouter } from "./users/routes.config";
import debug from "debug";


const app = express()
const server = http.createServer(app)
const PORT = 3000


const debugLog = debug("app")