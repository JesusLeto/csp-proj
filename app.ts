import express from "express";
import http from "http"

import cors from "cors"
import bodyParser from "body-parser";

import { CommonRouterConfig } from "./routes/common.router";
import { UsersRouter } from "./routes/user.router";

import client from "./db/connecting"
import errorHandler from "./middleware/error";


const app = express()
const server = http.createServer(app)
const PORT = 3000
const routes: Array<CommonRouterConfig> = []

app.use(cors())
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
//app.use("/api", app)

routes.push(new UsersRouter(app));

const runningMessage = `Server running at http://localhost:${PORT}`;
app.use(errorHandler)


server.listen(PORT, async () => {
    console.log(runningMessage);
    try {
        await client.connect()
    } catch (e) {
        console.log('Db connect error: ', e)
    }
});
