import {
    deleteUser,
    getAllUser,
    getCurrentUser,
    loginUser,
    registUser,
} from "../controller/user.controller";

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

    {
        path: "/api/v1/user/get-all",
        method: "get",
        action: getAllUser,
    },

    {
        path: "/api/v1/user/get-current",
        method: "get",
        action: getCurrentUser,
    },

    {
        path: "/api/v1/user/delete/:userId",
        method: "delete",
        action: deleteUser,
    },
];
