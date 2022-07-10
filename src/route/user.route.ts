import { loginUser, registUser } from "../controller/user.controller";

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

    {
        path: "/api/v1/user/login",
        method: "post",
        action: loginUser,
    },
];
