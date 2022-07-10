const cors = require("cors");
import "reflect-metadata";
import { createConnection } from "typeorm";
import express, { Request, Response } from "express";
import { jwt_checking } from "./middleware/auth";

declare module "express" {
    export interface Request {
        user: any;
    }
}

createConnection()
    .then(async () => {
        const app = express();

        process.env.TZ = "Asia/Manila";

        const corsOpts = {
            origin: true,
            methods: ["GET", "POST", "DELETE", "PUT"],
            allowedHeaders: ["Content-Type", "authorization", "x-access-token"],
            credentials: true,
            exposedHeaders: ["set-cookie"],
        };
        app.use(express.json());

        app.use(cors(corsOpts));

        const { AppRoutes } = await import("./routes");

        for (const route of AppRoutes) {
            let jwt_except = ["/api/v1/user/register", "/api/v1/user/login"];

            if (jwt_except.indexOf(route.path) > -1) {
                app[route.method](route.path, (req: Request, res: Response) => {
                    route.action(req, res);
                });
            }

            app[route.method](
                route.path,
                [jwt_checking],
                // [admin_check]
                (req: Request, res: Response) => {
                    route.action(req, res);
                }
            );
        }

        const PORT = process.env.PORT || 9000;

        // run app
        app.listen(PORT, () => {
            console.log(`server started on localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log("TypeORM connection error: ", error);
        process.exit(0);
    });
