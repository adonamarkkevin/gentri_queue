import { registUser } from "../controller/user.controller";

export const userRoutes: {
    path: string;
    method: string;
    action: any;
}[] = [
    {
        path: "/api/v1/user/register",
        method: "post",
        action: registUser,
    },
];
